interface ResidentFormData {
    fullName: string;
    flatNumber: string;
    contactNumber: string;
    email: string;
    isActive: string;
    age: string;
}

interface ResidentData {
    id: number;
    full_name: string;
    flat_id: string;
    phone: string;
    email: string;
    age: number;
    is_active: boolean;
}

interface FetchedResidentData {
    id: number;
    fullname: string;
    flatid: string;
    phone: string;
    email: string;
    age: number;
    is_active: boolean;
}

interface VisitorData {
    name: string
    contact: string
    purpose: string
}

interface VisitorPassResponse {
    success: boolean
    message: string
    data: {
        id: number
        name: string
        contact: string
        purpose: string
        pass_number: string
        created_at: string
        valid_until: string
    }
}