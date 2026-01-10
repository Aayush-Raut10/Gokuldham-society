const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

const submitForm = async (formData: Record<string, any> | FormData, endpoint: string, type?: 'json' | 'form'): Promise<ApiResponse> => {
    try {
        let body: BodyInit = JSON.stringify(formData);
        const headers: Record<string, string> = {};

        if (!type || type === 'json') {
            body = JSON.stringify(formData);
            headers['Content-Type'] = 'application/json';
        } else if (type === 'form') {
            if (formData instanceof FormData) {
                body = formData;
            } else {
                const form = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    form.append(key, value);
                });
                body = form;
            }
        }

        console.log('Submitting to:', formData);

        const response = await fetch(ENDPOINT + endpoint, {
            method: 'POST',
            headers,
            body,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return {
            success: true,
            message: response.statusText,
            data: await response.json()
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}

const updateForm = async (formData: Record<string, any>, endpoint: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(ENDPOINT + endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return {
            success: true,
            message: 'Form updated successfully',
            data: result
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}

const fetchData = async (endpoint: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(ENDPOINT + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return {
            success: true,
            message: 'Data fetched successfully',
            data
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}

const deleteData = async (endpoint: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(ENDPOINT + endpoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return {
            success: true,
            message: 'Data deleted successfully',
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}

export { submitForm, updateForm, fetchData, deleteData };