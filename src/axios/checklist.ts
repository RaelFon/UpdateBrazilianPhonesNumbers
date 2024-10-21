import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class ChecklistAxios {
  constructor() {}

  async getCheckListHomeOwnerPhones(page: number): Promise<any> {
    try {
      const response = await axios({
        method: "get",
        url: `http://127.0.0.1:8082/homeowner?name=&cpf=&email=&externalPMSId=&active=true&page=${page}`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateChecklistHomeOwnerPhone(params: {
    homeOwnerId: number;
    phone: string;
    phone2: string;
  }) {
    try {
      await axios({
        method: "patch",
        url: `http://127.0.0.1:8082/homeowner/updatephone/${params.homeOwnerId}`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        data: {
          phone1: params.phone,
          phone2: params.phone2,
        },
      }).then(() => console.log("Updated homeOwner Id: " + params.homeOwnerId));
    } catch (error) {
      console.error(error);
    }
  }
}
