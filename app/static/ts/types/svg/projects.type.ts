export type ProjectImage = {
    image_url: string;
    alt_text: string;
    is_main_image?: boolean;
}

export type ProjectData = {
    project: string;
    languages: string[];
    logo: {
        image_url: string;
        alt_text?: string;
        is_main_image?: boolean;
    };
    otherImages: {
        image_url: string;
        alt_text?: string;
        is_main_image?: boolean;
    }[];
    excerpt: string;
    link: string;
};


export type ProjectsData = ProjectData[];
