declare global {
    interface Skill {
        name: string;
        year: string;
        level: string;
        type: SkillType;
        mark?: string;
        icon: React.ElementType;
    }

}
export {};