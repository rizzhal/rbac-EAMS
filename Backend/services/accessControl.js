import accessRules from "../rules/accessRules.js";

const checkAccess = ({user , action, task = null}) => {
    const applicableRules = accessRules.filter((rule) => {
        return (
            rule.role === user.role &&
            rule.action === action
        )
    });
    for (const rule of applicableRules) {
         const allowed = rule.condition({
            user,
            task
        });
        if(allowed){
            return true;
        }
    }
    return false
}

export default checkAccess;