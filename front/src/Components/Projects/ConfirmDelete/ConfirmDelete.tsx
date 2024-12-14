import { useModal } from "../../../Context";
import './ConfirmDelete.css';


interface Props {
  // ConfirmDelete: (id: string) => Promise<boolean>;
  ConfirmDelete: (id: string) => Promise<boolean>;
  message: string;
  id: string;
}

export const ConfirmDelete = ({ ConfirmDelete, message, id }: Props) => {
  const { closeModal: CloseModal } = useModal();

  const ConfirmDeleteFunction = async () => {
    const res = await ConfirmDelete(id);
    if (res) CloseModal();
  }
  return (
    <div className="confirm-delete">
      <h2>Confirm Delete</h2>
      {/* <p>Are you sure you want to delete this</p> */}
      <p>{message}</p>
      <div className="btn-actions">
        <button className="btn cancel" onClick={CloseModal} >Cancel</button>
        <button className="btn confirm" onClick={ConfirmDeleteFunction} >Confirm</button>
      </div>
    </div>
  )
}
