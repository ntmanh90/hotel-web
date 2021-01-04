import { throwError } from 'rxjs';
import { ErrorResponseVM } from '../_models/errorRespon.model';

export abstract class BaseService {
errorVM: ErrorResponseVM = new ErrorResponseVM();
    constructor() { }

    protected handleErrorS(errorResponse: any) {
        if (errorResponse.error.message) {
            return throwError(errorResponse.error.message || 'Server error');
        }

        if (errorResponse.error.errors) {
            // let modelStateErrors: ErrorResponseVM[] = [];

            // // for now just concatenate the error descriptions, alternative we could simply pass the entire error response upstream
            // for (const errorMsg of errorResponse.error.errors) {
            //    modelStateErrors.push({error_key: errorMsg.key, error_message: errorMsg.error});
            // }

            let modelStateErrorString ='Server error';
            console.log(errorResponse.error);
            modelStateErrorString = errorResponse.error.errorMsg;
            return throwError(modelStateErrorString || 'Server error');
        }
        return throwError('Server error');
    }
}