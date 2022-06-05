export interface Video {
    id: number;
    url: string;
    title: string;
    creator: string;
    description: string;
    votedUp: number;
    votedDown: number;
    votedType: string;
}
export interface ShareVideoPayload {
    url: string;
    title: string;
    description: string;
    creator: string;
}
export interface VoteVideoPayload {
    id: number;
    voteType: string;
}
export interface VideoInformation {
    title: string;
    author_name: string;
    author_url: string;
    url: string;
}