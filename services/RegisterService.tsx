import request from "../utils/request";

async function getPoliceStation(id: any) {
  const data = await request(
    `/term/b2c/city/${id}?withChildren=true&platform=4`
  );
  return data;
}

async function signUp(data: any) {
  const res = await request(`/vendor-registration`, {
    method: "POST",
    data: data,
  });
  return res;
}
async function loginWithPassword(data: any) {
  const res = await request(`/vendor-login`, {
    method: "POST",
    data: data,
  });
  return res;
}

export default { getPoliceStation, signUp, loginWithPassword };
