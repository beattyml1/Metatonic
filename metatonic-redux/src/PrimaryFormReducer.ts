import {FormEvents, FormSchema, FormState} from "metatonic-core"
import {FormStateChanges} from "metatonic-core";
import {MetatonicAction} from "metatonic-core";
import {MetatonicRootAction} from "metatonic-core";

export function formReduce(formId): (state: FormState, action: MetatonicRootAction) => FormState {
    let reducer = (state: FormState, action: MetatonicRootAction) => {
        if (action.meta.formId !== formId) return state;
        switch (action.type) {
            case FormEvents.itemAdded: return FormStateChanges.itemAdded(state, action.payload.propertySelector, action.payload.item, action.payload.index);
            case FormEvents.itemRemoved: return FormStateChanges.itemRemoved(state, action.payload.propertySelector, action.payload.index);
            case FormEvents.formServerDataUpdate: return FormStateChanges.formServerUpdate(state, action.payload.formData);
            case FormEvents.propertiesChanged: return FormStateChanges.propertiesChanged(state, action.payload.properties);
            case FormEvents.propertyChanged: return FormStateChanges.propertyChanged(state, action.payload.propertySelector, action.payload.value);
            case FormEvents.fullReload: return FormStateChanges.fullReload(state||{}, action.payload.formData, action.payload.schema);
            case FormEvents.initializeState: return action.payload;
            case FormEvents.loadStarted: return FormStateChanges.startLoad(state)
            case FormEvents.loadFinished: return FormStateChanges.finishLoad(state)
            case FormEvents.initializeStateEmpty: return FormStateChanges.initializeFormStateEmpty();
            default: return state||{};
        }
    }
    return reducer;

}