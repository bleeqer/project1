export const isObject = (candidate: any) => {
    return (candidate && typeof candidate === "object" && !Array.isArray(candidate));
}

export const deepMergeObjects = (superset: any, subset: any) => {
    if (!isObject(superset) || !isObject(subset)) return;

    Object.entries(subset)
        .forEach(entry => {
            const key = entry[0];
            const value = entry[1];
            if (isObject(value)) {
                superset[key] = deepMergeObjects(superset[key], subset[key]);
            } else {
                superset[key] = value;
            }
        })

    return superset;
}
