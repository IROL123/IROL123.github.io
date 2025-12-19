export interface ResearchItem {
    id: string
    year: number | string // Allow string for ranges like "2024 (Pending)" or just numbers
    title: string
    description?: string
    meta?: string // For extra metadata like "Application No." or "Conference Name"
    authors?: string
    role?: string // For projects: "Principal Investigator", etc.
    funding?: string // For projects: Funding agency
    period?: string // For projects: Duration
}

export const PATENTS: ResearchItem[] = [
    {
        id: 'p-2024-1',
        year: 2024,
        title: 'Autonomous Logistics Transport System and Method',
        meta: 'Application No: 10-2024-0179969',
        description: 'System structure and control method for autonomous transport robots that automatically recognize and transport multiple logistics items, including collaboration and path optimization.'
    },
    {
        id: 'p-2024-2',
        year: 2024,
        title: 'Exoskeleton Suit for Assisting Stretching Exercise',
        meta: 'Application No: 10-2024-0154262',
        description: 'Wearable exoskeleton robot suit supporting safe and effective stretching by sensing body movements and applying appropriate assistive force or posture correction.'
    },
    {
        id: 'p-2020-1',
        year: 2020,
        title: 'Hybrid 3D Printer (Additive & Subtractive)',
        meta: 'Application No: 10-2020-0068118 / US Patent US10543642B2',
        description: 'A dual-stage device combining additive manufacturing nozzle and subtractive cutting unit to perform printing and surface finishing consecutively for improved surface quality.'
    },
    {
        id: 'p-2020-2',
        year: 2020,
        title: '3D Printer with Integrated Cutting Unit',
        meta: 'Application No: 10-2020-0019075',
        description: 'Improvements on hybrid 3D printing by adding a milling head to the frame to smooth surfaces immediately after layer printing, eliminating post-processing.'
    },
    {
        id: 'p-2017-1',
        year: 2017,
        title: 'Postural Information Correction Method Using Wearable Sensors',
        meta: 'Application No: 10-2017-0108191',
        description: 'Algorithm for correcting bias errors in motion data collected by wearable IMU sensors, identifying human body posture information from sensor data.'
    },
    {
        id: 'p-2017-2',
        year: 2017,
        title: 'Lower Limb Kinematics Calibration Device and Method',
        meta: 'Application No: 10-2017-0108190',
        description: 'Device and method for correcting kinematic errors in leg joints using a calibration tool to measure individual leg lengths and joint axis misalignments.'
    },
    {
        id: 'p-2017-3',
        year: 2017,
        title: '2-DOF Passive Revolute Joint & Rough Terrain Mobile Robot',
        meta: 'Application No: 10-2017-0104164',
        description: 'Passive joint module allowing flexible posture changes on rough terrain without separate actuation, aiding traction and shock absorption.'
    },
    {
        id: 'p-2017-4',
        year: 2017,
        title: 'Engine Oil Discharge Device and Method',
        meta: 'Application No: 10-2017-0102322',
        description: 'Device with vacuum suction and filtering for rapid and clean engine oil discharge, minimizing environmental pollution.'
    },
    {
        id: 'p-2015-1',
        year: 2015,
        title: 'Dual-Stage Structure 3D Printer',
        meta: 'Application No: 10-2015-0154746 / US App No: 14/801,416',
        description: 'Innovative design placing additive and subtractive units in a vertical dual structure on a single frame for simultaneous printing and finishing.'
    },
    {
        id: 'p-2015-2',
        year: 2015,
        title: 'Integrated Drive Unit Structure',
        meta: 'Application No: 10-2015-0116102',
        description: 'Modularized drive unit integrating motor, gearbox, and sensor into a single housing for compact high-precision actuation.'
    },
    {
        id: 'p-2013-1',
        year: 2013,
        title: 'Wearable Robot and Control Method',
        meta: 'Application No: 10-2013-0000605',
        description: 'Control method for power-assist wearable robots sensing user movement to drive joints, forming the basis for various exoskeleton suits.'
    }
]

export const CONFERENCES: ResearchItem[] = [
    {
        id: 'c-2022-1',
        year: 2022,
        title: 'State Estimation Method for Dynamic Hand-Guiding Gesture for Industrial Robot Teleoperation',
        authors: 'H. Choi, H. Jeon, D. Noh, D. Lee',
        meta: 'KSME Production & Design Engineering Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2022-2',
        year: 2022,
        title: 'Omnidirectional Manipulator Control Based on Dynamic Hand-Guiding Gesture State Estimation',
        authors: 'H. Choi, D. Noh, D. Lee',
        meta: 'KSME Production & Design Engineering Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2022-3',
        year: 2022,
        title: 'Correlation Analysis Between Additive-Subtractive Process Conditions for Surface Roughness Improvement of FDM Parts',
        authors: 'S. Kim, D. Lee',
        meta: 'KSME Dynamics & Control Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2021-1',
        year: 2021,
        title: 'UR5e Manipulator Control via IMU Sensor-Based Gesture Recognition',
        authors: 'H. Yoon, D. Lee',
        meta: 'KSME Annual Conference (Poster)'
    },
    {
        id: 'c-2021-2',
        year: 2021,
        title: 'Development of Integrated Additive-Subtractive 3D Printer for FDM Rapid Prototyping',
        authors: 'S. Kim, D. Lee',
        meta: 'KSME Production & Design Engineering Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2021-3',
        year: 2021,
        title: 'Kinematic Calibration and Origin Initialization of Machine Vision-Based 3-DOF Planar Parallel Mechanism',
        authors: 'G. Lee, D. Lee',
        meta: 'KSME Annual Conference (Poster)'
    },
    {
        id: 'c-2021-4',
        year: 2021,
        title: 'Recursive Calibration Method for Over-Actuated Planar Parallel Mechanism Based on Machine Vision & Reflective Markers',
        authors: 'G. Lee, D. Lee',
        meta: 'KSME Annual Conference (Poster)'
    },
    {
        id: 'c-2021-5',
        year: 2021,
        title: 'Time-Series Wearable Sensor Data Augmentation Method via Mode-Switching Structure DCGAN',
        authors: 'D. Noh, D. Lee',
        meta: 'KSME Dynamics & Control Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2020-1',
        year: 2020,
        title: 'Quantitative Evaluation of Micro-Errors in Body-Fixed Frame Definition Using Wearable Inertial Sensors',
        authors: 'H. Yoon, D. Lee',
        meta: 'KSME Dynamics & Control Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2019-1',
        year: 2019,
        title: 'Robust Gait Phase Detection using Dual IMUs in Various Walking Directions',
        authors: 'H. Yoon, D. Lee',
        meta: 'IEEE Life Science Systems & Applications Workshop (LSSA) (Oral)'
    },
    {
        id: 'c-2018-1',
        year: 2018,
        title: 'Development Case for K-City Autonomous Driving Competition Using Autonomous Platform',
        authors: 'G. Lee, D. Lee',
        meta: 'KSME Dynamics & Control Division Spring Conf. (Poster)'
    },
    {
        id: 'c-2016-1',
        year: 2016,
        title: 'Young Children’s Animacy Judgments in Human-Robot Interaction with Humanoid Robots',
        authors: 'S. Jeon, D. Lee',
        meta: 'KROS Annual Conference (Poster)'
    }
]

export const PROJECTS: ResearchItem[] = [
    {
        id: 'pr-2024-1',
        year: '2024.03 - 2025.02',
        title: 'AI Robot-Based Human-Machine Collaboration Specialist Training',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Training specialists for worker-AI robot collaboration in manufacturing processes. Includes industrial projects and field training.'
    },
    {
        id: 'pr-2024-2',
        year: '2024.03 - 2025.02',
        title: 'Data Analysis-Based Electronics Manufacturing Specialist Training',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Training talents for data analysis and AI utilization in smart electronics manufacturing.'
    },
    {
        id: 'pr-2024-3',
        year: '2024.03 - 2025.02',
        title: 'Spatially Unconstrained Real-Time Tele-Command Tech for Mobile Manipulators via Human Dynamics & Deep Learning',
        funding: 'NRF',
        role: 'Principal Investigator (Sole)',
        description: 'Developing technology for free remote control of mobile manipulators in industrial sites without spatial constraints, using intention estimation.'
    },
    {
        id: 'pr-2024-4',
        year: '2024.01 - 2024.12',
        title: 'XR Twin-Based Rehabilitation Training Content Tech Development (\'24)',
        funding: 'IITP',
        role: 'Consortium',
        description: 'Developing virtual rehabilitation content using XR Twin technology, reflecting patient motion to digital avatars in real-time.'
    },
    {
        id: 'pr-2024-5',
        year: '2024.01 - 2024.12',
        title: 'Regional Intelligence Innovation Talent Training (Soongsil Univ, \'24)',
        funding: 'IITP',
        role: 'Principal Investigator',
        description: 'Training AI/Intelligence talents specialized for regional industrial demands (Smart Logistics/Manufacturing).'
    },
    {
        id: 'pr-2023-1',
        year: '2023.03 - 2024.02',
        title: 'AI Robot-Based Human-Machine Collaboration Specialist Training (Year 3)',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Advanced curriculum for industrial AI robot collaboration and problem-solving projects.'
    },
    {
        id: 'pr-2023-2',
        year: '2023.03 - 2024.02',
        title: 'Data Analysis-Based Electronics Manufacturing Specialist Training (Year 3)',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Specialist education on big data processing and AI analysis for electronics manufacturing.'
    },
    {
        id: 'pr-2023-3',
        year: '2023.01 - 2023.12',
        title: 'XR Twin-Based Rehabilitation Training Content Tech Development (\'23)',
        funding: 'IITP',
        role: 'Consortium',
        description: 'Development of VR rehab game prototypes and pilot testing in hospitals.'
    },
    {
        id: 'pr-2023-4',
        year: '2023.01 - 2023.12',
        title: 'Regional Intelligence Innovation Talent Training (Soongsil Univ, \'23)',
        funding: 'IITP',
        role: 'Principal Investigator',
        description: 'Fostering AI/SW talents for Seoul\'s strategic industries with internships.'
    },
    {
        id: 'pr-2022-1',
        year: '2022.07 - 2022.12',
        title: 'Regional Intelligence Innovation Talent Training (Soongsil Univ, \'22)',
        funding: 'IITP',
        role: 'Principal Investigator',
        description: 'Establishing foundation for creative talent training in AI/Robot fields.'
    },
    {
        id: 'pr-2022-2',
        year: '2022.04 - 2022.12',
        title: 'XR Twin-Based Rehabilitation Training Content Tech Development (\'22)',
        funding: 'IITP',
        role: 'Consortium',
        description: 'Prototype development of motion capture and VR feedback system for rehabilitation.'
    },
    {
        id: 'pr-2022-3',
        year: '2022.03 - 2023.02',
        title: 'AI Robot-Based Human-Machine Collaboration Specialist Training (Year 2)',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Operation of joint curriculum and expansion of industry-academic projects.'
    },
    {
        id: 'pr-2022-4',
        year: '2022.03 - 2023.02',
        title: 'Creative Convergence Engineering Talent Support - Intelligent Robot',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Fostering creative talents in intelligent robotics through convergence curriculum (Design, Control, AI).'
    },
    {
        id: 'pr-2021-1',
        year: '2021.03 - 2022.02',
        title: 'AI Robot-Based Human-Machine Collaboration Specialist Training (Year 1)',
        funding: 'KIAT',
        role: 'Consortium',
        description: 'Initial year of specialist training program for AI robot collaboration.'
    },
    {
        id: 'pr-2021-2',
        year: '2021.03 - 2022.02',
        title: 'LINC+ 4th Industrial Revolution Innovation Leading Univ - AI Mobility',
        funding: 'NRF',
        role: 'Principal Investigator',
        description: 'Educational innovation in AI Mobility (Autonomous Vehicles, Drones) under LINC+.'
    },
    {
        id: 'pr-2021-3',
        year: '2021.03 - 2022.02',
        title: 'Design Tech Enhancement for Dual-Stage Based Integrated Finishing FDM 3D Printing Platform',
        funding: 'NRF',
        role: 'Principal Investigator',
        description: 'Advanced development of simultaneous additive-subtractive 3D printing platform for surface quality.'
    },
    {
        id: 'pr-2021-4',
        year: '2021.01 - 2021.12',
        title: 'IP Education Leading University Support Project',
        funding: 'KIPA',
        role: 'Principal Investigator',
        description: 'Spreading Intellectual Property (IP) education within the university.'
    },
    {
        id: 'pr-2019-1',
        year: '2019.07 - 2019.10',
        title: 'Hybrid 3D Printing Platform Tech for Simultaneous Additive-Subtractive Manufacturing',
        funding: 'NRF',
        role: 'Principal Investigator',
        description: 'Verification of dual-stage hybrid 3D printing concept.'
    },
    {
        id: 'pr-2019-2',
        year: '2019.06 - 2020.05',
        title: 'Integrated Perception System for Intelligent Robot Cognition Enhancement (Year 2)',
        funding: 'TIPA',
        role: 'Consortium',
        description: 'Development of multi-sensor fusion and AI decision making for robots.'
    },
    {
        id: 'pr-2019-3',
        year: '2019.02 - 2020.02',
        title: 'Lab-Specific Startup Leading University Project',
        funding: 'NRF',
        role: 'Participant',
        description: 'Promoting technology-based startups from university laboratories.'
    },
    {
        id: 'pr-2018-1',
        year: '2018.06 - 2019.05',
        title: 'Integrated Perception System for Intelligent Robot Cognition Enhancement (Year 1)',
        funding: 'TIPA',
        role: 'Consortium',
        description: 'Design of integrated perception platform and core module development.'
    },
    {
        id: 'pr-2016-1',
        year: '2016.05 - 2017.04',
        title: 'Human Autonomous Following System for Transport Assistance in Rough Terrain',
        funding: 'NRF',
        role: 'Consortium',
        description: 'Development of autonomous following robot system carrying loads in rough terrain using motion capture.'
    },
    {
        id: 'pr-2015-1',
        year: '2015.06 - 2016.05',
        title: 'High-Efficiency Lightweight Slim Reducer Module Development',
        funding: 'Haesung Good Three',
        role: 'Consortium',
        description: 'Industrial development of lightweight, high-shock-resistant reducer module.'
    }
]
