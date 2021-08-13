import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { Product: items } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {items.name}</title>
      </Head>
      <img
        src={items.photo.image.publicUrlTransformed}
        alt={items.photo.image.altText}
      />
      <div className="details">
        <h2>{items.name} </h2>
        <p>{items.description}</p>
      </div>
    </ProductStyles>
  );
}
