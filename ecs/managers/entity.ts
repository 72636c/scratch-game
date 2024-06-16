export const createEntityManager = () => {
  let lastId = 0;

  return {
    generateId: () => ++lastId,
  };
};
