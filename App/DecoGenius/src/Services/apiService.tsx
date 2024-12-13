import axios from "axios";

const url = "http://192.168.18.50:5000"

export const loginRequest = async (values:object, loginAuthorized:any, loginUnauthorized:any) => {
    await axios.post(url + '/public/login', values)  
        .then(loginAuthorized)
        .catch(loginUnauthorized);
}

export const registerRequest = async (values:object, registerAuthorized:any, registerUnauthorized:any) => {
    await axios.post(url + '/public/register', values)  
        .then(registerAuthorized)
        .catch(registerUnauthorized);
};

export const listRequest = async (values:any) => {
    return await axios.get(url + '/private/item-list', {
        headers: {
            Authorization: `Bearer ${values.token}`,
        },
    });
};

export const answerRequest = async (values:any) => {
    return await axios.post(url + '/private/view-answer',{ 
        design_id: values.design_id},  {
            headers: {
                Authorization: `Bearer ${values.token}`,
            },
    })
    .catch(error => {
        console.error('Erro:', error.response?.data || error.message);
        throw error;
    })

}

export const logoutRequest = async (values: any, logoutAuthorized: any) => {
    await axios
        .post(
            `${url}/private/logout`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${values.token}`,
                },
            }
        )
        .then(logoutAuthorized)
        .catch(error => {
            console.error('Erro ao realizar logout:', error.response?.data || error.message);
            throw error;
        });
};

export const CreateDesignRequest = async (values:any, onSucess:any, onError:any) => {
    return await axios.post(url + '/private/create-design', values.formattedData, {
        headers: {
            Authorization: `Bearer ${values.token}`,
        },
    })
    .then(onSucess)
    .catch(onError);
}
