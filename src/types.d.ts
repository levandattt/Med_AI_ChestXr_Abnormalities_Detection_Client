declare global {
    interface Skill {
        name: string;
        year: string;
        level: string;
        type: SkillType;
        mark?: string;
        icon: React.ElementType;
    }
    interface ApiResponse {
        data:{
            status: "success" | "error";
            message?: string;
            data: any;
        }
    }
}


export {};