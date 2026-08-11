import { ApiError } from "../utils/api-error.js";
import { getData, writeData } from "../utils/data.js";

export const getUserService = (_id?: number) => {
  const result = JSON.parse(getData());
  return result.users;
};

export const createUserService = (body: { name: string }) => {
  // 1. Ambil seluruh data users
  const result = JSON.parse(getData());

  // 2. Ambil latest ID
  const latestId =
    result.users.length > 0 ? result.users[result.users.length - 1].id : 0;

  // 3. Tambahkan data baru berdasarkan req body
  result.users.push({
    id: latestId + 1,
    name: body.name,
  });

  // 4. Jalankan fungsi writeData berdasarkan data yang sudah ditambahkan
  writeData(JSON.stringify(result, null, 2));

  return {
    message: "Add new user success",
  };
};

export const getUserByIdService = (id: number) => {
  // 1. Ambil seluruh data
  const users = getUserService();

  // 2. Looping seluruh isi data untuk mencari berdasarkan id
  const user = users.find((user: { id: number }) => {
    return user.id === id;
  });

  // 3. Kalau tidak ketemu kirim response balik 404 / user not found
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  // 4. Kalau ketemu kirim data user
  return user;
};
