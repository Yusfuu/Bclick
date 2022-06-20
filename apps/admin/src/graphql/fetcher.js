export const fetchData = async (query, variables) => {
  const res = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    const { message } = json.errors[0] || 'Error..';
    if (message === 'Access Forbiden') {
      signOut({ callbackUrl: '/' });
    }
  }
  return json.data;
};
