export const ALL_CASES = [
    {
        id: 'c1',
        title: 'State v. Smith',
        ref: 'CR-2024-892',
        type: 'Criminal Defense',
        status: 'Active',
        urgency: 'high',
        nextDeadline: 'Hearing: Dec 12',
        progress: 65
    },
    {
        id: 'c2',
        title: 'Jones Estate Probate',
        ref: 'CV-2024-104',
        type: 'Family Law',
        status: 'Pending',
        urgency: 'medium',
        nextDeadline: 'Filing Due: Dec 10',
        progress: 30
    },
    {
        id: 'c3',
        title: 'TechCorp Merger',
        ref: 'CP-2024-001',
        type: 'Corporate',
        status: 'Review',
        urgency: 'low',
        nextDeadline: 'Meeting: Dec 15',
        progress: 80
    },
    {
        id: 'c4',
        title: 'Doe v. City Transport',
        ref: 'PI-2023-552',
        type: 'Personal Injury',
        status: 'Discovery',
        urgency: 'high',
        nextDeadline: 'Deposition: Tomorrow',
        progress: 45
    },
];

export const RECENT_ACTIVITY = [
    { id: 1, case: 'State v. Smith', action: 'New Evidence Uploaded', user: 'Paralegal', time: '10 min ago' },
    { id: 2, case: 'Jones Estate', action: 'Client signed engagement', user: 'Client', time: '2 hours ago' },
    { id: 3, case: 'TechCorp Merger', action: 'Draft Contract generated', user: 'Advyon AI', time: '4 hours ago' },
];

export const CASE_FOLDERS_DATA = {
    'Evidence': [
        { name: "Forensic_Analysis_v2.pdf", type: "pdf", date: "Dec 05, 2024", status: "analyzed" },
        { name: "CCTV_Footage_Lobby.mp4", type: "video", date: "Dec 04, 2024", status: "processing" },
    ],
    'Witness Statements': [
        { name: "Witness_Statement_JohnDoe.pdf", type: "pdf", date: "Dec 04, 2024", status: "analyzed" },
        { name: "Transcript_Audio_Clip_04.docx", type: "doc", date: "Dec 03, 2024", status: "processing" },
    ],
    'Pleadings': [],
    'Correspondence': [],
    'Court Orders': [],
    'Research': []
};
