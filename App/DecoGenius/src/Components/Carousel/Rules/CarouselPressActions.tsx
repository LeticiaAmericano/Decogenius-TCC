import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import NavigateConstants from '../../../Constants/Navigate';
import API from '../../../Utils/RoutesFunctionsAPI';
import type { TPatient } from '../../../Types/Entities/TypePatient';
import type { IHandleFeedback } from '../../../Interfaces/Hooks/IFeedback';
import { EFeedbackType } from '../../../Constants/Components/FeedbackSpan';

export async function handleDeletePatientPress(
    navigation: NavigationProp<ParamListBase>,
    patient: TPatient | undefined,
    userToken: string,
    handleFeedback: IHandleFeedback
): Promise<void> {
    const data = await API.Patients.softDeletePatient({
        token: userToken,
        patientId: Number(patient?.id)
    });
    if (data) {
        handleFeedback(data, EFeedbackType.negative);
    }
    navigation.navigate(NavigateConstants.MenuUser, {
        patient: patient
    });
}
