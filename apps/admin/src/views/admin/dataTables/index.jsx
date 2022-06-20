import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import { columnsDataComplex } from 'views/admin/dataTables/variables/columnsData';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json';
import React from 'react';
import request, { gql } from 'graphql-request';
import { useMutation } from 'react-query';

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid mb='20px'>
        <InitialFocus />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
    </Box>
  );
}

const save = gql`
  mutation Mutation($input: DeliverymanInput!) {
    createDeliveryman(input: $input) {
      uid
      email
      emailVerified
      displayName
      photoURL
      phoneNumber
      disabled
    }
  }
`;

function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useMutation((payload) => {
    return request('http://localhost:4000/graphql', save, payload);
  });
  const onSave = async () => {
    mutate({
      input: {
        email: null,
        emailVerified: null,
        displayName: null,
        photoURL: null,
        phoneNumber: null,
        disabled: null,
        password: null,
      },
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Add a new one</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new deliveryman</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input placeholder='Full name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email address</FormLabel>
              <Input placeholder='Email address' />
            </FormControl>
            {/* phone number */}
            <FormControl mt={4}>
              <FormLabel>Phone number</FormLabel>
              <Input placeholder='Phone number' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSave} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
