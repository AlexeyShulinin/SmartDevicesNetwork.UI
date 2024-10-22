import React from 'react';
import { Label } from '@fluentui/react';
import {
    Dropdown,
    useId,
    Option,
    OptionOnSelectData,
} from '@fluentui/react-components';

interface ISelectProps {
    label: string;
    options: string[];
    onSelectChange: (values: string[]) => void;
    selectedValues: string[];
}

export const Select: React.FC<ISelectProps> = ({
    options,
    label,
    selectedValues,
    onSelectChange,
}) => {
    const dropdownId = useId('dropdown');

    const onOptionSelect = (_: unknown, data: OptionOnSelectData) => {
        onSelectChange(data.selectedOptions);
    };

    return (
        <div>
            <Label id={dropdownId}>{label}</Label>
            <Dropdown
                multiselect={true}
                aria-labelledby={dropdownId}
                selectedOptions={selectedValues}
                onOptionSelect={onOptionSelect}
                placeholder={label}>
                {options.map((option) => (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                ))}
            </Dropdown>
        </div>
    );
};
