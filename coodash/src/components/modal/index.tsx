import { useState, useMemo, useEffect } from "react";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { DadosPaciente } from "../pacienteficha";
import styles from "./styles.module.scss";
import { useFetch } from "../../hooks/useFetch";
import { useFetchUrl } from "../../hooks/useFecthUrl";

export function PacienteFicha({
  numberPaciente,
  pacienteObject,
  modalopen,
  closeModal,
  paciente,
}: any) {
  const { onClose } = useDisclosure();
  const [urlPaciente, setUrlPaciente] = useState("qualquer coisa");
  const [pacienteData, setPacienteData] = useState(null);

  const { data, error } = useFetchUrl(
    `https://randomuser.me/api/?page=1&results=${pacienteObject.position}&seed=1`
  );

  const memoizedValue = useMemo(() => paciente, [paciente]); // como o use memo funciona

  useEffect(() => {
    async function searhUrl() {
      if (
        data !== undefined &&
        pacienteObject.paciente != "" &&
        pacienteObject.position != ""
      ) {
        let search = await data.results.find(
          (user: { login: { uuid: Number } }) =>
            user.login.uuid === pacienteObject.paciente
        );
        if (search) {
          setPacienteData(search);
        }
      }
    }

    searhUrl();
  }, [pacienteObject, data]);

  function closePacienteUrl() {
    closeModal(false);
    if (pacienteData != null) {
      setPacienteData(null);
    }
  }

  return (
    <div>
      <Modal closeOnOverlayClick={false} isOpen={modalopen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop={"25vh"} width={"auto"} maxWidth={9000}>
          <ModalCloseButton onClick={() => closeModal(false)} />
          <ModalBody pb={6}>
            <DadosPaciente
              dados={pacienteData != null ? pacienteData : memoizedValue}
              numberPaciente={numberPaciente}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              width="100%"
              className={styles.button}
              colorScheme="red"
              onClick={() => closePacienteUrl()}
            >
              Fechar ficha
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
