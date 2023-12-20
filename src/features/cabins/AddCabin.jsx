import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(isOpenModal => !isOpenModal)}>
//         Add new cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onCLose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCLoseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
