const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || '';

const submitForm = async (formData: Record<string, any>, endpoint: string): Promise<{ success: boolean, message: string }> => {
    try {
        const response = await fetch(ENDPOINT + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return {
            success: true,
            message: 'Form submitted successfully',
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
        }
    }
}

export { submitForm };