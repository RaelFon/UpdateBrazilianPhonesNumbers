import { BackofficeAxios } from "src/axios/backoffice";
import { ChecklistAxios } from "src/axios/checklist";
import { PhoneVerification } from "src/phone-verification/phone-verification";

export class UpdateHomeOwnerPhoneService {
  constructor(
    private phoneVerification: PhoneVerification,
    private backofficeService: BackofficeAxios,
    private checklistService: ChecklistAxios
  ) {}

  async start() {
    // await this.updateChecklistBrazilianPhones();

    await this.updateBackofficeBrazilianPhones();
  }

  private async updateChecklistBrazilianPhones(): Promise<void> {
    let hasNextPage = true;
    let page = 1;
    let totalPhonesCount = 0;
    let toUpdatePhonesCount = 0;

    while (hasNextPage) {
      try {
        const homeOwners =
          await this.checklistService.getCheckListHomeOwnerPhones(page);

        if (homeOwners && homeOwners.entities.length > 0) {
          homeOwners.entities.map(async (homeOnwer: any) => {
            const homeOnwerPhone = homeOnwer.phone.replace(/\D+/g, "");
            const homeOnwerPhone2 = homeOnwer.phone2
              ? homeOnwer.phone2.replace(/\D+/g, "")
              : null;

            totalPhonesCount = totalPhonesCount + 1;

            if (homeOnwerPhone2) {
              totalPhonesCount = totalPhonesCount + 1;
            }

            let newPhone;
            let newPhone2;

            if (this.phoneVerification.isItToUpdate(homeOnwerPhone)) {
              newPhone =
                this.phoneVerification.addBrazilianCountryCode(homeOnwerPhone);

              toUpdatePhonesCount = toUpdatePhonesCount + 1;
            }

            if (
              homeOnwerPhone2 &&
              this.phoneVerification.isItToUpdate(homeOnwerPhone2)
            ) {
              newPhone2 =
                this.phoneVerification.addBrazilianCountryCode(homeOnwerPhone2);

              toUpdatePhonesCount = toUpdatePhonesCount + 1;
            }

            if (true) {
              await this.checklistService.updateChecklistHomeOwnerPhone({
                homeOwnerId: homeOnwer.id,
                phone: newPhone || homeOnwerPhone,
                phone2: newPhone2 || homeOnwerPhone2,
              });
            }
          });

          hasNextPage = homeOwners?.pagination.hasNext;
          page = page++;
        } else {
          break;
        }
      } catch (error) {
        console.error(error);

        break;
      }
    }

    console.log("totalPhones:" + totalPhonesCount);
    console.log("toUpdatePhonesCount:" + toUpdatePhonesCount);
  }

  private async updateBackofficeBrazilianPhones(): Promise<void> {
    let hasNextPage = true;
    let page = 28;
    let totalPhonesCount = 0;
    let toUpdatePhonesCount = 0;

    while (hasNextPage) {
      try {
        const homeOwners = await this.backofficeService.getHomeOwnerPhones(
          page
        );

        if (homeOwners && homeOwners.entities.length > 0) {
          const toUpdate = homeOwners.entities.map(async (homeOnwer: any) => {
            const homeOnwerPhone = homeOnwer.phone.replace(/\D+/g, "");
            const homeOnwerPhone2 = homeOnwer.phone2
              ? homeOnwer.phone2.replace(/\D+/g, "")
              : null;

            totalPhonesCount += 1;

            if (homeOnwerPhone2) {
              totalPhonesCount += 1;
            }

            let newPhone;
            let newPhone2;

            if (this.phoneVerification.isItToUpdate(homeOnwerPhone)) {
              newPhone =
                this.phoneVerification.addBrazilianCountryCode(homeOnwerPhone);
              toUpdatePhonesCount += 1;
            }

            if (
              homeOnwerPhone2 &&
              this.phoneVerification.isItToUpdate(homeOnwerPhone2)
            ) {
              newPhone2 =
                this.phoneVerification.addBrazilianCountryCode(homeOnwerPhone2);
              toUpdatePhonesCount += 1;
            }

            if (newPhone || newPhone2) {
              return this.backofficeService.updateBackofficeHomeOwnerPhone({
                id: homeOnwer.id,
                phone: newPhone || homeOnwerPhone,
                phone2: newPhone2 || homeOnwerPhone2,
              });
            }
          });

          await Promise.all(toUpdate);

          hasNextPage = homeOwners?.pagination.hasNext;
          page += 1;
        } else {
          break;
        }
      } catch (error) {
        console.error(error);
        break;
      }
    }

    console.log("totalPhones:" + totalPhonesCount);
    console.log("toUpdatePhonesCount:" + toUpdatePhonesCount);
  }
}
