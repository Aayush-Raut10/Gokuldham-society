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
    phone: string
    purpose: string
}

interface VisitorPassResponse {
    success: boolean
    message: string
    data: {
        id: number
        name: string
        phone: string
        purpose: string
        pass_number: string
        date_issued: string
        valid_until: string
    }
}