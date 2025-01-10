import {SkillType} from "../enums";
import {
    SiSpringboot,
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiMysql,
    SiRedis,
    SiDocker,
    SiGit, SiJira, SiFigma
} from "react-icons/si";
import {FaJava} from "react-icons/fa6";
import {BiLogoPostgresql} from "react-icons/bi";

export const skills: Skill[] = [
    {
        name: 'Spring Boot',
        year: '1',
        level: 'Intermediate',
        type: SkillType.BACK_END,
        icon: SiSpringboot,
    },
    {
        name: 'Java',
        year: '2',
        level: 'Intermediate',
        type: SkillType.BACK_END,
        icon: FaJava,
    },
    {
        name: 'Node.js',
        year: '3',
        level: 'Intermediate',
        type: SkillType.BACK_END,
        icon: SiNodedotjs,
    },
    {
        name: 'Reactjs',
        year: '3',
        level: 'Intermediate',
        type: SkillType.FRONT_END,
        icon: SiReact,
    },
    {
        name: 'PostgreSQL',
        year: '3',
        level: 'Advanced',
        type: SkillType.DATABASE,
        icon: BiLogoPostgresql
    },
    {
        name: 'MySQL',
        year: '4',
        level: 'Advanced',
        type: SkillType.DATABASE,
        icon: SiMysql
    },
    {
        name: 'MongoDB',
        year: '2',
        level: 'Intermediate',
        type: SkillType.DATABASE,
        icon: SiMongodb
    },
    {
        name: 'redis',
        year: '2',
        level: 'Intermediate',
        type: SkillType.DATABASE,
        icon: SiRedis
    },
    {
        name: 'Dockers',
        year: '3',
        level: 'Intermediate',
        type: SkillType.TOOLS,
        icon: SiDocker
    },
    {
        name: 'git',
        year: '4',
        level: 'Advanced',
        type: SkillType.TOOLS,
        icon: SiGit
    },
    {
        name: 'Jira',
        year: '2',
        level: 'Intermediate',
        type: SkillType.TOOLS,
        icon: SiJira
    },
    {
        name: 'figma',
        year: '3',
        level: 'Intermediate',
        type: SkillType.TOOLS,
        icon: SiFigma
    },
];
