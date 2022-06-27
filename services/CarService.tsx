import request from "../utils/request";

async function getcarList(id: any) {
  const data = await request(`/vendor/car-list?vendor_id=${id}`);
  return data;
}

async function getCarSeat() {
  const res = await request(`/vendor/car-seat`, {
    method: "OPTIONS",
    // data: data,
  });
  return res;
}
async function carStore(data: any) {
  const res = await request(`/vendor/car-store`, {
    method: "POST",
    data: data,
  });
  return res;
}
async function carUpdate(data: any) {
  const res = await request(`vendor/car-update`, {
    method: "PUT",
    data: data,
  });
  return res;
}
async function carDelete(id: any) {
  const res = await request(`vendor/car-delete?car_id=${id}`, {
    method: "DELETE",
    // data: data,
  });
  return res;
}

async function getRouteMap() {
  const data = await request(`/vendor/route-map-list`);
  return data;
}

export default {
  getcarList,
  getCarSeat,
  carStore,
  carUpdate,
  carDelete,
  getRouteMap,
};
