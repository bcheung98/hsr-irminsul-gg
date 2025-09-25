export interface Skill {
    name: string;
    description: string;
    icon?: string;
}

export interface SkillWithScaling extends Skill {
    scaling: string[][];
}

export interface SkillKeywords {
    [tag: string]: Skill;
}
