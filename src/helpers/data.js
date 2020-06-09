import { getPriceFixed } from "../containers/Services/helpers";

const formatServicesData = (data) => {
  const formatted = [];
  if (!data || !Array.isArray(data) || !data.length) return formatted;
  data.forEach((group) => {
    const { name, services } = group;
    if (services && Array.isArray(services) && services.length) {
      services.forEach((item) => formatted.push({
        ...item,
        group: name,
      }))
    }
  });
  return formatted;
};

export {
  formatServicesData
};