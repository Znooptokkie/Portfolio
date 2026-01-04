export interface ProjectImageJSON {
    image_url: string;
    alt_text: string;
    is_main_image?: boolean; 
}

export interface ProjectsJSON {
    title: string;
    languages_and_frameworks: string[];
    link: string;
    logo: {
        image_url: string;
        alt_text?: string;
        is_main_image?: boolean;
        project_image_id: number;
    };
    other_images: {
        image_url: string;
        alt_text?: string;
        is_main_image?: boolean;
        project_image_id: number;
    }[];
    excerpt: string;
}

