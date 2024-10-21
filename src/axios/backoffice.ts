import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class BackofficeAxios {
  constructor() {}

  async getPartnerPhones(): Promise<any> {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.BACKOFFICE_URL}/partners/phones/`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getHomeOwnerPhones(page: number): Promise<any> {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.BACKOFFICE_URL}/home-owners?pageSize=50&page=${page}`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateBackofficePartnerPhone(params: {
    partnerPhoneId: string;
    phoneNumber: string;
  }) {
    try {
      await axios({
        method: "patch",
        url: `${process.env.BACKOFFICE_URL}/partners/phone/${params.partnerPhoneId}`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        data: {
          phoneNumber: params.phoneNumber,
        },
      }).then(() =>
        console.log("UPDATED PARTNER PHONE ID:" + params.partnerPhoneId)
      );
    } catch (error) {
      console.error(
        "ERROR AT UPDATE PARTNER PHONE ID:" + params.partnerPhoneId
      );
      console.error(error);
    }
  }

  async updateBackofficeHomeOwnerPhone(params: {
    id: number;
    phone: string;
    phone2: string;
  }) {
    try {
      await axios({
        method: "patch",
        url: `${process.env.BACKOFFICE_URL}/home-owners/phones/${params.id}`,
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        data: {
          phone: params.phone,
          phone2: params.phone2,
        },
      }).then(() => console.log("Updated homeOwner Id: " + params.id));
    } catch (error) {
      console.error(error);
    }
  }
}
