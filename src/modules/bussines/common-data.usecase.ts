import { CommonDataService } from "../infrastructure/services/i-data-service";

export class CommonDataUseCase {
  private data: any;

  constructor() {
    this.data = [];
  }

  async getCommonData(RequestService: CommonDataService, ) {

    this.data = await RequestService.getData();
    return this.data;
  }
}