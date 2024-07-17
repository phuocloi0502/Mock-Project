export const urlApi = "http://localhost:8088/api/v1/";
export const dataTable = (rawData) => {
  const data = rawData.map((item) => ({
    key: item.id,
    fullname: `${item?.firstName} ${item?.lastName}`,
    ...item,
  }));
  return data;
};
