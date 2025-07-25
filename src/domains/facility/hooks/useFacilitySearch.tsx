import {FacilitySearchReq, FacilityType} from "../types/facility";
import {useSearchParams} from "react-router-dom";

//todo: 확장해서 모든 query 객체에서 사용 가능하게 해보자
export function useFacilitySearch() {
    const [params, setParams] = useSearchParams();

    const getString = (key: string): string | undefined => {
        const value = params.get(key)
        if (value == "" || value == null) {
            return undefined
        }

        return value
    }

    const getNumber = (key: string): number | undefined => {
        const value = params.get(key)
        if (value == "" || value == null) {
            return undefined
        }

        const number = Number(value)
        if (isNaN(number)) {
            return undefined
        }

        return number
    }

    //todo: 이 방법이 최선일까?
    //todo: 또 유효성 검사를 추가해야 하지 않을까?
    const searchReq: FacilitySearchReq = {
        query: getString('query'),
        address: getString('address'),
        facilityType: getString('facilityType') as FacilityType,
        grade: getString('grade'),
        minPrice: getNumber("minPrice"),
        maxPrice: getNumber("maxPrice"),
        withinYears: getNumber("withinYears"),
        page: getNumber("page"),
        size: getNumber("size"),
    };
    const updateSearchParam = (updates: Partial<Record<keyof FacilitySearchReq, string | number>>) => {
        const next = new URLSearchParams(params);
        Object
            .entries(updates)
            .forEach(([key, value]) => {
                next.set(key, String(value));
            })

        setParams(next, {replace: true});
    };


    return {searchReq, updateSearchParam}
}