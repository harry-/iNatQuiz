export interface Observation {
    uuid: string;
    id: number;
    user: User;
    place_guess?: string;
    taxon?: Taxon;
    photos: Photo[];
    time_observed_at: string;
    time_zone_offset: string;
    created_at: string;
    faves_count: number;
    faves: Vote[];
    identifications: Identification[];
    identifications_count: number,
    description: string | null;
    quality_grade: string;
    comments: Comment[];
    comments_count: number;
    uri?: string;
    location?: string;
    geojson: Geojson;
    geoprivacy?: string;
    obscured: boolean;
    quality_metrics: QualityMetric[];
    tags: string[];
    project_observations: ProjectObservation[];
}

export interface Results{
    total_results: number;
    page: number;
    per_page: number;
    results: Observation[]|User[]|Relationship[];
}

export interface User {
    id: number;
    name?: string;
    login?: string;
    icon?: string;
    icon_url?: string;
    observations_count?: number;
    description?: string;
    roles?: string[];
    species_count?: number;
    last_active?: string;
}

export interface Vote {
    id: number;
    user_id: number;
    user?: User;
    vote_flag?: boolean;
    vote_scope?: string;
}

export interface Taxon {
    id: number;
    name?: string;
    iconic_taxon_name?: string;
    preferred_common_name?: string;
    english_common_name?: string;
    rank?: string;
    rank_level: number;
    matched_term?: string;
    default_photo?: Photo;
    is_active?: boolean;
    wikipedia_summary?: string;
    wikipedia_url?: string;
    taxon_photos?: TaxonPhoto[];
    children?: Taxon[];
    ancestors?: Taxon[];
    ancestor_ids: number[];
}

export interface TaxonPhoto{
    taxon: Taxon;
    photo: Photo;
}

export interface Photo {
    id: number;
    url: string;
    original_dimensions: {height: number, width: number}; 
    attribution: string;
    licence_code: string;
}

export interface Geojson {
    coordinates: number[];
    type: string;
}

export interface Identification {
    id: number;
    uuid: string;
    created_at: string;
    current: boolean;
    taxon: Taxon,
    user: User,
    category?: string;
    body?: string;
}

export interface Comment {
    id: number;
    uuid: string;
    body?: string;
    created_at: string;
    user: User;
    html?: string;
}

export interface Place {
    id: number;
    display_name?: string;
    point_geojson: Geojson;
    observations_count?: number;
}

export interface CommentsCreate {
    fields?: string;
    comment: { 
        parent_type: 'Observation' | 'Post'; 
        parent_id: string; /*uuid*/
        body: string;
    }
}

export interface IdentificationsCreate {
    fields?: string;
    identification: {
        body?: string;
        observation_id: string; /*uuid*/
        taxon_id: number;
        vision?: boolean;
        disagreement?: boolean;
    }
}

export interface ResultsUpdates {
    total_results: number;
    page: number;
    per_page: number;
    results: Notification[];
}

export interface Notification {
    id: number;
    comment?: Comment;
    identification?: Identification;
    created_at: string;
    resource_uuid: string;
}

export interface ObservationsUpdates {
    created_after?: string;
    viewed?: boolean;
    observations_by?: 'owner'|'following';
    page?: number;
    per_page?: number;
    fields?: string;
}

export interface QualityMetric {
    id: number;
    agree: boolean;
    metric: string;
    user?: User;
    user_id: number;
}

export interface Relationship {
    created_at: string;
    following: boolean;
    friend_user: User;
    id: number;
} 

export interface ResultsRelationship {
    total_results: number;
    page: number;
    per_page: number;
    results: Relationship[];
}

export interface Project {
    id: number;
    created_at: string;
    description: string;
    header_image_url?: string;
    icon: string;
    title: string;
    banner_color?: string;
    slug?: string;
}

export interface ProjectObservation {
    id: number;
    project: Project;
    project_id: number;
    uuid: string;
}

export interface SpeciesCount {
    count: number;
    taxon: Taxon;
}

export interface SpeciesTreeCount {
    count: number;
    id: number;
    name?: string;
    children: SpeciesTreeCount[];
}

export interface TaxonomyNode{
    id: number;
    count?: number;
    name: string;
    rank?: string;
    rank_level?: number;
    parent_id?: number;
    descendant_obs_count: number;
    direct_obs_count?: number;
    descendant?: TaxonomyNode[];
}

export interface TaxonomyResult {
    count_without_taxon: number;
    size: number;
    results: TaxonomyNode[];
}

export interface ResultsSearch {
    total_results: number;
    page: number;
    per_page: number;
    results: Observation[];
}
export interface UserData {
    id: number
    username: string
    score: number
    questionindex: number
}