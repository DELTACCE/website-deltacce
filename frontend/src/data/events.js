export const events = [
  {
    slug: 'bridge-course-cum-project-expo',
    title: 'BRIDGE COURSE CUM PROJECT EXPO',
    subtitle: 'CSE (Data Science) Department',
    date: 'To be scheduled',
    location: 'Christ College of Engineering',
    tagline: 'A structured bridge programme for first-year students to learn web development, collaborate in teams, and present projects confidently.',
    blurb:
      'The event brings together a workshop week, a mentor-led build sprint, and a final project expo for the incoming CSE (Data Science) batch.',
    audience: 'Incoming first-year CSE (Data Science) students',
    format: 'Workshop week, project sprint, and public expo',
    overview: [
      'A week-long learning experience designed to strengthen fundamentals in web development and practical problem solving.',
      'Students will move from guided sessions to team-based project development and a final public showcase.'
    ],
    days: [
      {
        slug: 'day-0-orientation',
        label: 'Day 0',
        title: 'Orientation and setup',
        summary: 'A welcome session to introduce the programme, explain expectations, and prepare students for the days ahead.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Introduce the purpose of the bridge programme.',
              'Walk students through the schedule and event flow.',
              'Build confidence through senior-student guidance and setup support.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'Orientation and schedule walkthrough',
              'Senior-student confidence-building session',
              'Laptop setup and prerequisite checks'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Session briefing notes',
              'Software installation checklist',
              'Mentor guide for student confidence and support'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Students arrive prepared, informed, and ready to begin the workshop track.'
          }
        ]
      },
      {
        slug: 'day-1-frontend',
        label: 'Day 1',
        title: 'Frontend fundamentals',
        summary: 'Students begin with the basics of building web pages using HTML, CSS, and JavaScript.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Explain the structure of a basic web page.',
              'Introduce layout and styling concepts.',
              'Help students build a simple front-end page from scratch.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'HTML structure and semantics',
              'CSS styling and page layout',
              'JavaScript basics for interaction'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Frontend notes and starter templates',
              'Practice exercises for layout and styling',
              'Reference examples for simple UI components'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Students gain confidence in creating basic front-end pages and understanding the structure of web interfaces.'
          }
        ]
      },
      {
        slug: 'day-3-python-and-backend',
        label: 'Day 3',
        title: 'Python and backend basics',
        summary: 'The session shifts toward programming logic, backend structure, and how applications connect to data.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Introduce Python programming basics.',
              'Explain the role of backend logic in a web app.',
              'Set up a simple Flask-based application structure.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'Python basics and development flow',
              'Flask project structure and routing',
              'Environment setup and development workflow'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Python handout and examples',
              'Flask starter project',
              'Environment setup checklist'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Students understand how frontend and backend pieces connect in a simple web application.'
          }
        ]
      },
      {
        slug: 'day-4-git-and-tools',
        label: 'Day 4',
        title: 'Git, GitHub, and practical tools',
        summary: 'Students learn how to manage code, collaborate with others, and work with everyday development tools.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Introduce version control with Git.',
              'Explain GitHub workflows for sharing and collaboration.',
              'Familiarise students with Linux and command-line basics.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'Git setup and command basics',
              'GitHub repository workflow',
              'Linux basics and local environment usage'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Git cheat sheet',
              'GitHub repository guide',
              'Command-line practice sheet'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Students can manage their codebase and collaborate with peers using industry-style tools.'
          }
        ]
      },
      {
        slug: 'day-5-ideation',
        label: 'Day 5',
        title: 'Problem solving and ideation',
        summary: 'The week moves from learning to application as students begin defining a project idea and working in teams.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Help students identify real problems worth solving.',
              'Guide them in forming project teams.',
              'Introduce coordination tools such as Discord.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'Problem framing and ideation',
              'Team formation and role planning',
              'Discord onboarding and group coordination'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Problem statement worksheet',
              'Team planning template',
              'Discord setup guide'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Each team leaves with a clear idea, structure, and communication plan for the build sprint.'
          }
        ]
      },
      {
        slug: 'day-6-7-build-sprint',
        label: 'Days 6–7',
        title: 'Project development sprint',
        summary: 'Teams spend two days building their projects with support from mentors and peer collaborators.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Turn concepts into working prototypes.',
              'Encourage teamwork, iteration, and practical problem solving.',
              'Provide mentor support for technical and project decisions.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'Feature planning and implementation',
              'Mentor support and debugging',
              'Project refinement and presentation preparation'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Mentor support schedule',
              'Project checklist',
              'Presentation and demo guide'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Teams complete a working project prototype ready for the final expo.'
          }
        ]
      },
      {
        slug: 'day-8-expo',
        label: 'Day 8',
        title: 'Project expo and launch',
        summary: 'The event concludes with project presentations, official launch moments, and recognition for the best work.',
        sections: [
          {
            title: 'Objectives',
            type: 'checklist',
            items: [
              'Showcase student projects to the wider department.',
              'Introduce the DELTA association and its purpose.',
              'Recognise strong effort and innovation through awards.'
            ]
          },
          {
            title: 'Key topics',
            type: 'list',
            items: [
              'Project exhibition and judging',
              'Association launch and welcome',
              'Prize distribution and feedback collection'
            ]
          },
          {
            title: 'Resources',
            type: 'cards',
            items: [
              'Expo checklist',
              'Feedback form template',
              'Prize distribution plan'
            ]
          },
          {
            title: 'Outcome',
            type: 'paragraph',
            content: 'Students leave with a visible milestone, feedback, and a stronger sense of belonging in the department community.'
          }
        ]
      }
    ]
  }
];
