import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';

const deliverymens = gql`
  query Deliverymens {
    deliverymens {
      uid
      email
      emailVerified
      displayName
      photoURL
      phoneNumber
      disabled
      metadata {
        creationTime
        lastSignInTime
        lastRefreshTime
      }
      customClaims
    }
  }
`;

export default function ColumnsTable(props) {
  const { data: deliverymensQuery, isLoading } = useQuery(
    'deliverymens',
    async () => {
      const response = await request(
        'http://localhost:4000/graphql',
        deliverymens
      );
      return response.deliverymens;
    }
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>All Deliverymens</TableCaption>
        <Thead>
          <Tr>
            <Th>Display Name</Th>
            <Th>Email</Th>
            <Th>Email Verified</Th>
            <Th>Phone Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deliverymensQuery.map((deliverymen) => (
            <Tr key={deliverymen.uid}>
              <Td>{deliverymen.displayName}</Td>
              <Td>{deliverymen.email}</Td>
              <Td>{deliverymen.emailVerified ? 'Yes' : 'No'}</Td>
              <Td>{deliverymen.phoneNumber}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
