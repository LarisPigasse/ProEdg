// src/pages/operatori/OperatoriList.tsx
import { useEffect, useState } from "react";
import { Edit, Trash2, UserPlus, AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchOperatori,
  deleteOperatore,
  setSelectedOperatore,
} from "../operatori";
import { Operatore } from "../operatori/operatoriService";
import OperatoreForm from "./OperatoreForm";
import Table, { TableColumn } from "../../core/components/ui/Table";
import useModal from "../../core/hooks/useModal";
import Button from "../../core/components/ui/Button";
import Modal from "../../core/components/ui/Modal";

const OperatoriList = () => {
  const dispatch = useAppDispatch();
  const { operatori, loading, error } = useAppSelector(
    (state) => state.operatori
  );
  const { user } = useAppSelector((state) => state.auth);
  const [operatoreToDelete, setOperatoreToDelete] = useState<Operatore | null>(
    null
  );

  // Hook per il modal del form
  const {
    isOpen: isFormOpen,
    openModal: openForm,
    closeModal: closeForm,
  } = useModal();

  // Hook per il modal di conferma eliminazione
  const {
    isOpen: isDeleteConfirmOpen,
    openModal: openDeleteConfirm,
    closeModal: closeDeleteConfirm,
  } = useModal();

  // Carica gli operatori all'avvio del componente
  useEffect(() => {
    dispatch(fetchOperatori());
  }, [dispatch]);

  // Gestione modifica operatore
  const handleEdit = (operatore: Operatore) => {
    dispatch(setSelectedOperatore(operatore));
    openForm();
  };

  // Gestione nuovo operatore
  const handleNew = () => {
    dispatch(setSelectedOperatore(null));
    openForm();
  };

  // Gestione conferma eliminazione
  const handleDeleteConfirm = (operatore: Operatore) => {
    setOperatoreToDelete(operatore);
    openDeleteConfirm();
  };

  // Esecuzione eliminazione
  const confirmDelete = async () => {
    if (operatoreToDelete) {
      await dispatch(deleteOperatore(operatoreToDelete.idOperatore));
      setOperatoreToDelete(null);
      closeDeleteConfirm();
    }
  };

  // Verifica permessi per modifica/eliminazione
  const canModify = (operatore: Operatore) => {
    // Un operatore non può modificare operatori con livello superiore o uguale
    return user?.livello !== undefined && user.livello < operatore.livello;
  };

  // Formattazione data ultimo login
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Mai";
    const date = new Date(dateString);
    return date.toLocaleString("it-IT");
  };

  // Definizione delle colonne
  const columns: TableColumn<Operatore>[] = [
    {
      header: "Nome",
      accessor: "operatore",
      className: "font-medium text-gray-900",
    },
    {
      header: "Email",
      accessor: "email",
      className: "text-sm text-gray-500",
    },
    {
      header: "Profilo",
      accessor: "profilo",
      className: "text-sm text-gray-900",
    },
    {
      header: "Livello",
      accessor: "livello",
      className: "text-sm text-gray-900",
    },
    {
      header: "Stato",
      accessor: (operatore) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            operatore.stato === "attivo"
              ? "bg-green-100 text-green-800"
              : operatore.stato === "inattivo"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {operatore.stato}
        </span>
      ),
    },
    {
      header: "Ultimo Login",
      accessor: (operatore) => formatDate(operatore.ultimaLogin),
      className: "text-sm text-gray-500",
    },
    {
      header: "Azioni",
      accessor: (operatore) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation(); // Evita che il click si propaghi alla riga
              handleEdit(operatore);
            }}
            disabled={!canModify(operatore)}
            className={!canModify(operatore) ? "opacity-50" : ""}
          >
            <Edit className="h-4 w-4 text-sky-600" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={(e) => {
              e.stopPropagation(); // Evita che il click si propaghi alla riga
              handleDeleteConfirm(operatore);
            }}
            disabled={!canModify(operatore)}
            className={!canModify(operatore) ? "opacity-50" : ""}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestione Operatori</h1>
        <Button
          variant="primary"
          size="md"
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={handleNew}
        >
          Nuovo Operatore
        </Button>
      </div>

      {/* Messaggio di errore */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Tabella operatori */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table
          data={operatori}
          columns={columns}
          keyExtractor={(operatore) => operatore.idOperatore}
          isLoading={loading}
          emptyMessage="Nessun operatore trovato"
          onRowClick={handleEdit}
        />
      </div>

      {/* Modal conferma eliminazione */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={closeDeleteConfirm}
        title="Conferma eliminazione"
        size="sm"
      >
        <div className="mb-6">
          <p>
            Sei sicuro di voler eliminare l'operatore{" "}
            <span className="font-semibold">
              {operatoreToDelete?.operatore}
            </span>
            ? Questa azione non può essere annullata.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={closeDeleteConfirm}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Elimina
          </Button>
        </div>
      </Modal>

      {/* Form operatore in modal */}
      <OperatoreForm isOpen={isFormOpen} onClose={closeForm} />
    </div>
  );
};

export default OperatoriList;
