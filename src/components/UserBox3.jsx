import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const UserBox = ({ people, setUserId }) => {

    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null);

    const allOption = { id: 'all', name_fa: 'همه' };
    const filteredPeople = query === ''
        ? [allOption, ...people] // گزینه "همه" را به ابتدا اضافه می‌کنیم
        : [allOption, ...people?.filter((person) => person.name_fa.toLowerCase().includes(query.toLowerCase()))];


        const handleSelectedPerson = (person) => {
            setSelectedPerson(person);
            if (person.id === 'all') {
                setUserId(null);  // برای انتخاب "همه"، شناسه صرافی ارسال نشود
            } else {
                setUserId(person.id);
            }
        };


    return (
        <Combobox as="div" value={selectedPerson} onChange={handleSelectedPerson} className="parent-div">

            <div className="div-box relative">
                <Combobox.Input
                    className="input-box rounded-md border-0 bg-white py-3 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => {
                        setQuery(event.target.value)

                    }}
                    displayValue={(person) => person?.name_fa ? person?.name_fa : 'انتخاب نام صرافی'}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredPeople.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredPeople.map((person) => (
                            <Combobox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name_fa }</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}

export default UserBox