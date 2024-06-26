import { Modal } from '@beep/ui'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import ModalAlert from '../modal-alert/modal-alert'

interface ModalOptions {
  width: number
}

interface DefaultContextProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  setContentModal: Dispatch<SetStateAction<ReactNode>>
  setOptionsModal: (optionsModal: ModalOptions) => void
  optionsModal: ModalOptions
  alertClickOutside: boolean
  enableAlertClickOutside: (mustConfirm: boolean) => void

  modalAlertOpen: boolean
  setModalAlertOpen: (alertModalOpen: boolean) => void

  alertModalChoice: boolean | undefined
  setAlertModalChoice: (alertModalChoice: boolean | undefined) => void
}

const defaultContext: DefaultContextProps = {
  openModal: false,
  setOpenModal: () => true,
  // eslint-disable-next-line react/jsx-no-useless-fragment
  setContentModal: () => <></>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOptionsModal: () => {},
  optionsModal: {
    width: 488,
  },
  alertClickOutside: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  enableAlertClickOutside: () => {},
  modalAlertOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalAlertOpen: () => {},

  alertModalChoice: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlertModalChoice: () => {},
}

export const ModalContext = createContext<DefaultContextProps>(defaultContext)

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider = (props: ModalProviderProps) => {
  const [openModal, setOpenModal] = useState(false)
  const [contentModal, setContentModal] = useState<any>(<></>)
  const [optionsModal, setOptionsModal] = useState({
    width: 488,
  })
  const [alertClickOutside, enableAlertClickOutside] = useState(false)
  const [modalAlertOpen, setModalAlertOpen] = useState(false)
  const [alertModalChoice, setAlertModalChoice] = useState<boolean | undefined>(
    undefined
  )

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
        setContentModal,
        setOptionsModal,
        optionsModal,
        alertClickOutside,
        enableAlertClickOutside,
        setModalAlertOpen,
        modalAlertOpen,
        alertModalChoice,
        setAlertModalChoice,
      }}
    >
      <Modal
        externalOpen={openModal}
        setExternalOpen={setOpenModal}
        width={optionsModal.width}
      >
        {contentModal}
      </Modal>
      <ModalAlert isOpen={modalAlertOpen} />
      {props.children}
    </ModalContext.Provider>
  )
}
