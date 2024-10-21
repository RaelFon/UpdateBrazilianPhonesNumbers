import { BackofficeAxios } from "src/axios/backoffice";
import { PhoneVerification } from "src/phone-verification/phone-verification";

export class UpdatePartnerPhoneService {
  constructor(
    private phoneVerification: PhoneVerification,
    private backofficeService: BackofficeAxios
  ) {}

  async start() {
    await this.updateBrazilianPartnerPhones();
  }

  private async updateBrazilianPartnerPhones(): Promise<void> {
    try {
      const partnerPhones =
        await this.backofficeService.getPartnerPhones();
      let updatedPhonesCount = 0;

      if (partnerPhones && partnerPhones.length > 0) {
        partnerPhones.forEach(async (pp: any) => {
          if (this.phoneVerification.isItToUpdate(pp.number)) {
            await this.backofficeService.updateBackofficePartnerPhone({
              partnerPhoneId: pp.id,
              phoneNumber: this.phoneVerification.addBrazilianCountryCode(
                pp.number
              ),
            });

            updatedPhonesCount = updatedPhonesCount + 1;
          }
        });

        console.log("Total Phones: " + partnerPhones.length);
        console.log("Updated Phones Count: " + updatedPhonesCount);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
