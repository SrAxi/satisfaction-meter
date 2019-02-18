/**
 * Reasons
 */
const ACADEMIC = 'academic';
const PROFESSIONAL = 'professional';
const ROMANTIC = 'romantic';
const PHYSICAL = 'physical';
const SOCIAL = 'social';
const FUN = 'fun';


/**
 * Interfaces
 */
interface SatisfactionParams {
    goal: number;
    achieved: number;
    satisfaction: number;
}

interface Global extends SatisfactionParams {
}

interface Reason extends SatisfactionParams {
    active: boolean;
}

interface Achievement {
    title: string;
    description?: string;
    importance: number;
    reason: string;
}


/**
 * Store
 */
const store = {
    reasons: {
        [ACADEMIC]: <Reason>{
            active: true,
            goal: 50,
            achieved: 1,
            satisfaction: 0,
        },
        [PROFESSIONAL]: <Reason>{
            active: false,
            goal: 50,
            achieved: 1,
            satisfaction: 0,
        },
        [ROMANTIC]: <Reason>{
            active: false,
            goal: 50,
            achieved: 1,
            satisfaction: 0,
        },
        [PHYSICAL]: <Reason>{
            active: false,
            goal: 50,
            achieved: 1,
            satisfaction: 0,
        },
        [SOCIAL]: <Reason>{
            active: false,
            goal: 50,
            achieved: 1,
            satisfaction: 0,
        },
        [FUN]: <Reason>{
            active: false,
            goal: 50,
            achieved: 1,
            satisfaction: 0,
        },
    },
    achievements: [],
    global: <Global>{
        goal: 300,
        achieved: 1,
        satisfaction: 0,
    }
};


/**
 * Selectors
 */
const global = () => <Global>store.global;
const totalGoal = () => global().goal;

const reasons = () => store.reasons;
const academicReason = () => <Reason>reasons()[ACADEMIC];
const professionalReason = () => <Reason>reasons()[PROFESSIONAL];
const romanticReason = () => <Reason>reasons()[ROMANTIC];
const physicalReason = () => <Reason>reasons()[PHYSICAL];
const socialReason = () => <Reason>reasons()[SOCIAL];
const funReason = () => <Reason>reasons()[FUN];

const achievements = () => <Achievement[]>store.achievements;


/**
 * Getters
 */
const getReason = (reason: string) => <Reason>store.reasons[reason];
const getAchievementsByReason = (reason: string) =>
    <Achievement[]>achievements()
        .filter((a: Achievement) => a.reason === reason);


/**
 * Helpers
 */
const calculatePercentage = (achieved: number, goal: number) => +((achieved / goal) * 100).toFixed(2);
const sumProperties = (obj, prop: string): number => Object.keys(obj).reduce((acc, reason) => acc + obj[reason][prop], 0);
const calculateGlobalGoal = (): number => sumProperties(reasons(), 'goal');
const calculateGlobalAchieved = (): number => sumProperties(reasons(), 'satisfaction');
const calculateReasonSatisfaction = ({achieved, goal}: Reason): number => {
    return achieved > 0
        ? calculatePercentage(achieved, goal)
        : 0;
};


/**
 * Actions
 */
const updateGlobal = () => {
    const goal = calculateGlobalGoal();
    const achieved = calculateGlobalAchieved();
    const satisfaction = calculatePercentage(achieved, goal);
    store.global = <Global>{
        goal,
        achieved,
        satisfaction
    };
};

const setReasonActive = (reason: string) => {
    store.reasons[reason].active = true;
};

const unsetReasonActive = (reason: string) => {
    store.reasons[reason].active = false;
};

const setReasonSatisfaction = (reason: string, payload: number) => {
    const currentSatisfaction = getReason(reason).satisfaction;
    store.reasons[reason].satisfaction = payload ? payload : currentSatisfaction;
};

const unsetReasonSatisfaction = (reason: string) => {
    store.reasons[reason].satisfaction = 0;
};

const setReasonAchieved = (reason: string, payload: number) => {
    const currentAchieved = getReason(reason).achieved;
    store.reasons[reason].achieved = payload ? payload : currentAchieved;
};

const unsetReasonAchieved = (reason: string) => {
    store.reasons[reason].achieved = 1;
};

const setReasonGoal = (reason: string, payload: number) => {
    const currentGoal = getReason(reason).goal;
    store.reasons[reason].goal = payload ? payload : currentGoal;
};

const unsetReasonGoal = (reason: string) => {
    store.reasons[reason].goal = 0;
};

const setReason = (reason: string, payload: Reason) => {
    store.reasons[reason] = payload;
};

const setAchievement = (payload: Achievement) => {
    const currentReason = getReason(payload.reason);
    const newAchieved = currentReason.achieved + payload.importance;
    const newReason = <Reason>{
        active: currentReason.active,
        goal: currentReason.goal,
        achieved: newAchieved,
        satisfaction: calculatePercentage(newAchieved, currentReason.goal)
    };

    setReason(payload.reason, newReason);

    // Adding achievement to list of achievements
    achievements().push(payload);
};


/**
 * App flow example
 */
console.log(' - Start App -');
console.log('-----');

console.log('Selecting and setting reasons: ', ACADEMIC, PROFESSIONAL, ROMANTIC);
console.log('-----');
setReason(ACADEMIC, <Reason>{
    active: true,
    goal: 80,
    achieved: 1,
    satisfaction: calculatePercentage(1, 80)
});
setReason(PROFESSIONAL, <Reason>{
    active: true,
    goal: 90,
    achieved: 1,
    satisfaction: calculatePercentage(1, 90)
});
setReason(ROMANTIC, <Reason>{
    active: true,
    goal: 100,
    achieved: 100,
    satisfaction: calculatePercentage(100, 100)
});


console.log('academicReason', academicReason());
console.log('professionalReason', professionalReason());
console.log('romanticReason', romanticReason());
console.log('-----');
