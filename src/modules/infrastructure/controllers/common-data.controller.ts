import { CommonDataUseCase } from '../../bussines/common-data.usecase';
import { ClientsService } from '../services/clients.service';
import { LiteralsService } from '../services/literals.service';
import { ModelsService } from '../services/models.service';
import { StageService } from '../services/stage.service';
export class CommonDataController {

    private static literalsService: LiteralsService;
    private static modelsService: ModelsService;
    private static clientsService: ClientsService;
    private static stageService: StageService;

    private static commonDataUseCase: CommonDataUseCase;



    static getLiterals() {
        CommonDataController.literalsService = new LiteralsService();
        CommonDataController.commonDataUseCase = new CommonDataUseCase();
        return CommonDataController.commonDataUseCase.getCommonData(CommonDataController.literalsService);
    }
    static getClients() {
        CommonDataController.clientsService = new ClientsService();
        CommonDataController.commonDataUseCase = new CommonDataUseCase();
        return CommonDataController.commonDataUseCase.getCommonData(CommonDataController.clientsService);
    }
    static getModels() {
        CommonDataController.modelsService = new ModelsService();
        CommonDataController.commonDataUseCase = new CommonDataUseCase();
        return CommonDataController.commonDataUseCase.getCommonData(CommonDataController.modelsService);
    }
    static getStages() {
        CommonDataController.stageService = new StageService();
        CommonDataController.commonDataUseCase = new CommonDataUseCase();
        return CommonDataController.commonDataUseCase.getCommonData(CommonDataController.stageService);
    }

}
