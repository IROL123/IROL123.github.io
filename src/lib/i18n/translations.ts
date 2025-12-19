export type Language = 'en' | 'ko'

export interface Translations {
    // Navigation
    nav: {
        home: string
        research: string
        researchOverview: string
        researchOverviewDesc: string
        publications: string
        publicationsDesc: string
        conferences: string
        conferencesDesc: string
        patents: string
        patentsDesc: string
        projects: string
        projectsDesc: string
        people: string
        professor: string
        professorDesc: string
        members: string
        membersDesc: string
        alumni: string
        alumniDesc: string
        notices: string
        datasets: string
    }
    // Hero Section
    hero: {
        university: string
        words: string[]
        subtitle: string
        exploreResearch: string
        ourProjects: string
    }
    // Stats Section
    stats: {
        title: string
        subtitle: string
        publications: string
        patents: string
        labMembers: string
        researchProjects: string
    }
    // Research Pages
    research: {
        title: string
        subtitle: string
        robotics: {
            title: string
            description: string
            items: string[]
        }
        hri: {
            title: string
            description: string
            items: string[]
        }
        wearable: {
            title: string
            description: string
            items: string[]
        }
    }
    publications: {
        title: string
        empty: string
    }
    conferences: {
        title: string
        subtitle: string
    }
    patents: {
        title: string
        subtitle: string
    }
    projects: {
        title: string
        subtitle: string
    }
    // People Page
    people: {
        title: string
        tabs: {
            professor: string
            members: string
            alumni: string
        }
        roles: {
            principalInvestigator: string
            phdStudent: string
            mastersStudent: string
            undergrad: string
            staff: string
            alumni: string
        }
        empty: {
            professor: string
            members: string
            alumni: string
            default: string
        }
    }
    // Datasets Page
    datasets: {
        title: string
        empty: string
    }
    // Notices Page
    notices: {
        title: string
        empty: string
        categories: {
            news: string
            seminar: string
            recruiting: string
            event: string
        }
    }
    // Common
    common: {
        searchPlaceholder: string
        loading: string
    }
}

export const translations: Record<Language, Translations> = {
    en: {
        nav: {
            home: 'Home',
            research: 'Research',
            researchOverview: 'Overview',
            researchOverviewDesc: 'Our key research areas',
            publications: 'Publications',
            publicationsDesc: 'Papers and journals',
            conferences: 'Conferences',
            conferencesDesc: 'Academic presentations',
            patents: 'Patents',
            patentsDesc: 'Intellectual property',
            projects: 'Projects',
            projectsDesc: 'Research grants & tasks',
            people: 'People',
            professor: 'Professor',
            professorDesc: 'Principal Investigator',
            members: 'Members',
            membersDesc: 'Current students & researchers',
            alumni: 'Alumni',
            alumniDesc: 'Graduated members',
            notices: 'Notices',
            datasets: 'Datasets',
        },
        hero: {
            university: 'Soongsil University',
            words: ['Intelligent', 'Robotics', 'Laboratory'],
            subtitle: 'Pioneering the future of Human-Robot Interaction, Autonomous Systems, and Deep Learning.',
            exploreResearch: 'Explore Research',
            ourProjects: 'Our Projects',
        },
        stats: {
            title: 'Our Impact',
            subtitle: 'Years of research in robotics and AI have led to significant contributions in both academia and industry.',
            publications: 'Publications',
            patents: 'Patents',
            labMembers: 'Lab Members',
            researchProjects: 'Research Projects',
        },
        research: {
            title: 'Research Areas',
            subtitle: 'We focus on creating intelligent robot systems that can think and work alongside humans.',
            robotics: {
                title: 'Robotics & Autonomous Systems',
                description: 'We develop autonomous navigation algorithms and mobile robot platforms capable of operating in diverse environments. Our work covers SLAM, path planning, and obstacle avoidance for robust mobility.',
                items: ['Mobile Robots & Navigation', 'Rough Terrain Locomotion', 'Multi-Robot Coordination'],
            },
            hri: {
                title: 'Human-Robot Interaction (HRI)',
                description: 'We aim to bridge the gap between human intuition and machine precision. Our research includes gesture recognition, intention estimation, and telemanipulation interfaces using VR/AR.',
                items: ['Gesture Recognition & Control', 'VR/AR Telemanipulation', 'Operator Intent Estimation'],
            },
            wearable: {
                title: 'Wearable Sensors & AI',
                description: 'Utilizing wearable inertial sensors and deep learning, we analyze human motion and gait patterns for healthcare, rehabilitation, and intuitive robot control applications.',
                items: ['Gait Analysis & Rehabilitation', 'Deep Learning for Time-Series Data', 'Motion Recognition'],
            },
        },
        publications: {
            title: 'Publications',
            empty: 'No publications yet.',
        },
        conferences: {
            title: 'Conferences',
            subtitle: 'Academic Presentations & Proceedings',
        },
        patents: {
            title: 'Patents',
            subtitle: 'Intellectual Property & Technology Transfer',
        },
        projects: {
            title: 'Projects',
            subtitle: 'Funded Research Grants & Tasks',
        },
        people: {
            title: 'People',
            tabs: {
                professor: 'Professor',
                members: 'Members',
                alumni: 'Alumni',
            },
            roles: {
                principalInvestigator: 'Principal Investigator',
                phdStudent: 'PhD Student',
                mastersStudent: 'Masters Student',
                undergrad: 'Undergrad',
                staff: 'Staff',
                alumni: 'Alumni',
            },
            empty: {
                professor: 'No professor profile found.',
                members: 'No active members currently listed.',
                alumni: 'No alumni listed yet.',
                default: 'No team members yet.',
            },
        },
        datasets: {
            title: 'Datasets',
            empty: 'No datasets available yet.',
        },
        notices: {
            title: 'Notices',
            empty: 'No notices yet.',
            categories: {
                news: 'News',
                seminar: 'Seminar',
                recruiting: 'Recruiting',
                event: 'Event',
            },
        },
        common: {
            searchPlaceholder: 'Search posts...',
            loading: 'Loading...',
        },
    },
    ko: {
        nav: {
            home: '홈',
            research: '연구',
            researchOverview: '개요',
            researchOverviewDesc: '주요 연구 분야',
            publications: '논문',
            publicationsDesc: '학술 논문 및 저널',
            conferences: '학회',
            conferencesDesc: '학술 발표',
            patents: '특허',
            patentsDesc: '지식재산권',
            projects: '프로젝트',
            projectsDesc: '연구 과제',
            people: '구성원',
            professor: '교수님',
            professorDesc: '연구책임자',
            members: '연구원',
            membersDesc: '현재 연구원 및 학생',
            alumni: '졸업생',
            alumniDesc: '졸업 연구원',
            notices: '공지사항',
            datasets: '데이터셋',
        },
        hero: {
            university: '숭실대학교',
            words: ['지능형', '로봇', '연구실'],
            subtitle: '휴먼-로봇 인터랙션, 자율 시스템, 딥러닝의 미래를 개척합니다.',
            exploreResearch: '연구 보기',
            ourProjects: '프로젝트',
        },
        stats: {
            title: '연구 성과',
            subtitle: '로봇공학과 AI 분야에서 수년간의 연구를 통해 학계와 산업계에 기여하고 있습니다.',
            publications: '논문',
            patents: '특허',
            labMembers: '연구원',
            researchProjects: '연구 과제',
        },
        research: {
            title: '연구 분야',
            subtitle: '인간과 함께 생각하고 협력할 수 있는 지능형 로봇 시스템을 연구합니다.',
            robotics: {
                title: '로보틱스 & 자율 시스템',
                description: '다양한 환경에서 작동할 수 있는 자율 주행 알고리즘과 이동 로봇 플랫폼을 개발합니다. SLAM, 경로 계획, 장애물 회피 등의 연구를 수행합니다.',
                items: ['이동 로봇 & 내비게이션', '험지 주행', '다중 로봇 협업'],
            },
            hri: {
                title: '휴먼-로봇 인터랙션 (HRI)',
                description: '인간의 직관과 기계의 정밀함 사이의 간극을 연결합니다. 제스처 인식, 의도 추정, VR/AR 원격 조작 인터페이스를 연구합니다.',
                items: ['제스처 인식 & 제어', 'VR/AR 원격 조작', '작업자 의도 추정'],
            },
            wearable: {
                title: '웨어러블 센서 & AI',
                description: '웨어러블 관성 센서와 딥러닝을 활용하여 헬스케어, 재활, 직관적인 로봇 제어를 위한 인체 동작 및 보행 패턴을 분석합니다.',
                items: ['보행 분석 & 재활', '시계열 데이터 딥러닝', '동작 인식'],
            },
        },
        publications: {
            title: '논문',
            empty: '아직 게시된 논문이 없습니다.',
        },
        conferences: {
            title: '학회',
            subtitle: '학술 발표 및 논문집',
        },
        patents: {
            title: '특허',
            subtitle: '지식재산권 & 기술이전',
        },
        projects: {
            title: '프로젝트',
            subtitle: '연구 과제 및 수주 현황',
        },
        people: {
            title: '구성원',
            tabs: {
                professor: '교수님',
                members: '연구원',
                alumni: '졸업생',
            },
            roles: {
                principalInvestigator: '연구책임자',
                phdStudent: '박사과정',
                mastersStudent: '석사과정',
                undergrad: '학부생',
                staff: '연구원',
                alumni: '졸업생',
            },
            empty: {
                professor: '교수님 프로필이 없습니다.',
                members: '현재 등록된 연구원이 없습니다.',
                alumni: '아직 등록된 졸업생이 없습니다.',
                default: '아직 등록된 구성원이 없습니다.',
            },
        },
        datasets: {
            title: '데이터셋',
            empty: '아직 제공되는 데이터셋이 없습니다.',
        },
        notices: {
            title: '공지사항',
            empty: '아직 공지사항이 없습니다.',
            categories: {
                news: '뉴스',
                seminar: '세미나',
                recruiting: '채용',
                event: '행사',
            },
        },
        common: {
            searchPlaceholder: '검색...',
            loading: '로딩 중...',
        },
    },
}
