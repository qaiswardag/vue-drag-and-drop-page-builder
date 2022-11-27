<template>
    <TransitionGroup name="fade">
        <div
            v-for="(optionWithValues, optionWithValuesIndex) in dynamicOptionsWithValuesFields"
            :key="optionWithValuesIndex">
            <div class="grid grid-cols-12 primary-gap mb-8 text-xs">
                <div class="col-span-4 self-start grid">
                    <label
                        :for="`options_values[${optionWithValuesIndex}][option]`"
                        class="tagifyLabel font-semibold">
                        Option
                    </label>
                    <div class="tagifyDiv">

                        <!--tag for option --- start-->
                        <div v-for="(option, idx) in optionsWithValuesForConversion" :key="option"
                             class="flex flex-wrap gap-2 items-center">
                            <ul v-if="option.optionId === optionWithValues.optionId"
                                class="flex flex-wrap grow items-center gap-2">
                                <!--hidden input fields - start-->
                                <input
                                    v-model="option.option"
                                    :name="`options_values[${optionWithValuesIndex}][option]`"
                                    type="text"
                                    hidden/>
                                <input
                                    v-model="option.optionId"
                                    :name="`options_values[${optionWithValuesIndex}][frontend_id]`"
                                    type="text"
                                    hidden/>
                                <input
                                    v-model="option.index"
                                    :name="`options_values[${optionWithValuesIndex}][option_index]`"
                                    type="text"
                                    hidden/>
                                <!--hidden input fields - end-->

                                <TransitionGroup name="tags">
                                    <li v-if="option.optionId === optionWithValues.optionId && option.option !== null"
                                        class="tagifyTag"
                                        @click="deleteEnteredOption(option.optionId)">
                                        {{
                                            option.option.substring(0, 6)
                                        }}{{ option.option.length > 6 ? '...' : '' }}
                                        <span>×</span>
                                    </li>
                                </TransitionGroup>

                                <div class="tagifyInputWithIcon">
                                    <input
                                        v-model="optionWithValues.option"
                                        @keydown.enter.tab.prevent="handleAddOption($event, optionWithValues.option, optionWithValues.optionId, optionWithValuesIndex)"
                                        :id="`options_values[${optionWithValuesIndex}][option]`"
                                        type="text"
                                        ref="refOptionInput"
                                        class="tagifyInput"
                                        placeholder="Color.."
                                        autocomplete="off">
                                    <div class="absolute inset-y-0 right-0 flex py-1.5">
                                        <kbd
                                            class="inline-flex items-center border border-gray-200 rounded py-1 px-2 text-xs font-sans font-normal text-gray-400">
                                            ⏎
                                        </kbd>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <!--tag for option --- end-->
                    </div>
                    <div v-if="frontendOptionError.index === optionWithValuesIndex">
                        <p class="primaryInputError">{{ frontendOptionError.error }}</p>
                    </div>
                    <BackendErrors
                        :errorField="`option${optionWithValues.optionId}`">
                    </BackendErrors>
                </div>

                <div class="col-span-8 self-start grid">
                    <div>
                        <label
                            :for="`options_values[${optionWithValuesIndex}][values]`"
                            class="tagifyLabel font-semibold">
                            Values
                        </label>


                        <div class="flex justify-center items-center gap-2">
                            <div class="tagifyDiv">
                                <!--tags for values --- start-->
                                <div>
                                    <div v-for="(option, idx) in optionsWithValuesForConversion" :key="idx">
                                        <ul v-if="option.optionId === optionWithValues.optionId">

                                            <draggable
                                                :list="option.values"
                                                :dragging="dragging"
                                                :disabled="!enabled"
                                                class="flex flex-wrap grow items-center gap-2"
                                                ghost-class="ghost"
                                                :move="checkMove"
                                                item-key="id"
                                                @start="dragging = true"
                                                @end="dragging = false">

                                                <!--iterate list - start-->
                                                <template #item="{ element, index }">
                                                    <li
                                                        class="tagifyTag"
                                                        @click="deleteEnteredValue(option.optionId, element.valueId)">
                                                        {{
                                                            element.nameValue.substring(0, 6)
                                                        }}{{
                                                            element.nameValue.length > 6 ? '...' : ''
                                                        }}
                                                        <span>×</span>

                                                        <!--hidden input fields - start-->
                                                        <input
                                                            v-model="element.nameValue"
                                                            :name="`options_values[${optionWithValuesIndex}][values][${index}][name_value]`"
                                                            type="text"
                                                            hidden/>

                                                        <input
                                                            v-model="element.valueId"
                                                            :name="`options_values[${optionWithValuesIndex}][values][${index}][value_id]`"
                                                            type="text"
                                                            hidden/>
                                                        <input
                                                            v-model="element.valueIndex"
                                                            :name="`options_values[${optionWithValuesIndex}][values][${index}][value_index]`"
                                                            type="text"
                                                            hidden/>
                                                        <input
                                                            v-model="element.optionId"
                                                            :name="`options_values[${optionWithValuesIndex}][values][${index}][frontend_option_id]`"
                                                            type="text"
                                                            hidden/>
                                                        <input
                                                            v-model="element.frontendOptionIndex"
                                                            :name="`options_values[${optionWithValuesIndex}][values][${index}][frontend_option_index]`"
                                                            type="text"
                                                            hidden/>
                                                        <!--hidden input fields - end-->

                                                    </li>

                                                </template>
                                                <!--iterate list - end-->

                                                <span>×</span>
                                            </draggable>


                                            <div class="tagifyInputWithIcon min-w-[6rem]">
                                                <input v-model="optionWithValues.value"
                                                       @keydown.enter.tab.prevent="handleAddValue(optionWithValues.value, optionWithValues.optionId, optionWithValuesIndex)"
                                                       :id="`options_values[${optionWithValuesIndex}][values]`"
                                                       type="text"
                                                       :ref="`${optionWithValues.optionId}`"
                                                       class="tagifyInput"
                                                       placeholder="White, Black.."
                                                       autocomplete="off">
                                                <div class="absolute inset-y-0 right-0 flex py-1.5">
                                                    <kbd
                                                        class="inline-flex items-center border border-gray-200 rounded py-1 px-2 text-xs font-sans font-normal text-gray-400">
                                                        ⏎
                                                    </kbd>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                    <!--tags for values --- end-->
                                </div>
                            </div>
                            <button
                                @click="deleteEnteredOptionWithValues(optionWithValues.optionId)"
                                class="onlyIconButton errorFocusWithErrorBackground py-4"
                                type="button">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="2"
                                     stroke="currentColor"
                                     class="w-5 h-5 cursor-pointer">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                            </button>
                        </div>

                        <div v-if="frontendValueError.index === optionWithValuesIndex">
                            <p class="primaryInputError">{{ frontendValueError.error }}</p>
                        </div>
                        <BackendErrors
                            :errorField="`value${optionWithValues.optionId}`">
                        </BackendErrors>
                    </div>
                </div>

            </div>
        </div>
    </TransitionGroup>

    <BackendErrors errorField="all_product_variants"></BackendErrors>
    <div v-if="OptionsWithValuesFrontendError">
        <p class="primaryInputError">{{ OptionsWithValuesFrontendError }}</p>
    </div>


    <div class="pt-10 pb-6">
        <div class="flex sm:justify-end items-center gap-6 pb-4 mb-4">
            <button
                @click="addAnNewOption"
                type="button"
                class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <PlusSmIconOutline class="h-6 w-6" aria-hidden="true"/>
            </button>
        </div>
    </div>


    <Transition name="fade">
        <div
            v-if="allVariants.length > 0"
            class="my-8">
            <div class="mt-8 flex flex-col">
                <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <div v-if="selectedValues.length > 0"
                                 class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                                <button type="button"
                                        @click="bulkEdit"
                                        class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                                    Bulk edit
                                </button>
                                <button
                                    @click="bulkDelete"
                                    type="button"
                                    class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                                    Delete all
                                </button>
                            </div>
                            <table class="min-w-full table-fixed divide-y divide-gray-300 text-sm">
                                <thead class="py-12 w-full bg-gray-50">
                                <tr>
                                    <th scope="col" class="relative py-6 w-12 px-6 sm:w-16 sm:px-8">
                                        <input type="checkbox"
                                               class="primaryCheckbox"
                                               :checked="indeterminate || selectedValues.length === allVariants.length"
                                               :indeterminate="indeterminate"
                                               @change="selectedValues = $event.target.checked ? allVariants.map((value) => value.nameValue) : []"/>
                                    </th>
                                    <th scope="col"
                                        class="min-w-[12rem] py-6 pr-3 text-left font-semibold text-gray-900">
                                        Value
                                    </th>

                                    <th scope="col"
                                        class="min-w-[10rem] px-3 py-6 text-left font-semibold text-gray-900">
                                        Price
                                    </th>
                                    <th scope="col"
                                        class="min-w-[10rem] px-3 py-6 text-left font-semibold text-gray-900">
                                        SKU (optional)
                                    </th>
                                    <th scope="col"
                                        class="min-w-[10rem] px-3 py-6 text-left font-semibold text-gray-900">
                                        Quantity in stock
                                    </th>
                                    <th scope="col"
                                        class="min-w-[10rem] px-3 py-6 text-left font-semibold text-gray-900">
                                        Barcode (optional)
                                    </th>
                                    <th scope="col"
                                        class="min-w-[6rem] pr-6 py-6 text-right font-semibold text-gray-900">
                                        Edit
                                    </th>
                                    <th scope="col"
                                        class="min-w-[6rem] pl-3 pr-8 py-6 text-left font-semibold text-gray-900">
                                        Delete
                                    </th>
                                </tr>
                                </thead>
                                <tbody
                                    class="divide-y divide-gray-200 bg-white">
                                <TransitionGroup name="table">
                                    <tr v-for="(value, index) in allVariants"
                                        :key="value.id"
                                        :class="[selectedValues.includes(value.nameValue) && 'bg-red-50']">

                                        <!--hidden input fields for all values for product - start-->
                                        <input
                                            v-model="value.id"
                                            :name="`all_product_variants[${index}][value_id]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.nameValue"
                                            :name="`all_product_variants[${index}][name_value]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.productPrice"
                                            :name="`all_product_variants[${index}][product_price]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.productSku"
                                            :name="`all_product_variants[${index}][product_sku]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.quantityInStock"
                                            :name="`all_product_variants[${index}][quantity_in_stock]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.productBarcode"
                                            :name="`all_product_variants[${index}][product_barcode]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.productWeight"
                                            :name="`all_product_variants[${index}][product_weight]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.material"
                                            :name="`all_product_variants[${index}][product_material]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.height"
                                            :name="`all_product_variants[${index}][product_height]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.width"
                                            :name="`all_product_variants[${index}][product_width]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.length"
                                            :name="`all_product_variants[${index}][product_length]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.midCode"
                                            :name="`all_product_variants[${index}][product_mid_code]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.hsCode"
                                            :name="`all_product_variants[${index}][product_hs_code]`"
                                            type="text"
                                            hidden/>
                                        <input
                                            v-model="value.countryOfOrigin"
                                            :name="`all_product_variants[${index}][country_of_origin]`"
                                            type="text"
                                            hidden/>
                                        <!--hidden input fields for all values for product - end-->


                                        <td class="relative w-12 px-6 sm:w-16 sm:px-8 py-4 align-top">
                                            <div v-if="selectedValues.includes(value.nameValue)"
                                                 class="absolute inset-y-0 left-0 w-0.5 bg-emerald-600">

                                            </div>
                                            <input type="checkbox"
                                                   class="primaryCheckbox my-3"
                                                   :value="value.nameValue" v-model="selectedValues"/>
                                        </td>
                                        <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium align-top', selectedValues.includes(value.nameValue) ? 'text-emerald-900' : 'text-gray-900']">

                                            <p class="py-3">
                                                {{ value.nameValue }}
                                            </p>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-gray-800 align-top">
                                            <input
                                                v-model="value.productPrice"
                                                type="text"
                                                placeholder="00.00"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <div
                                                class="border-0 whitespace-normal py-0 pr-4 text-sm font-semibold">
                                                <BackendErrors
                                                    :errorField="`product_price${value.id}`"></BackendErrors>
                                            </div>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-gray-800 align-top">
                                            <input
                                                v-model="value.productSku"
                                                type="text"
                                                placeholder="SKU (optional)"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <div
                                                class="border-0 whitespace-normal py-0 pr-4 text-sm font-semibold">
                                                <BackendErrors
                                                    :errorField="`product_sku${value.id}`">
                                                </BackendErrors>
                                            </div>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-gray-800 align-top">
                                            <div v-if="getAutoStock === true">
                                                <input
                                                    v-model="value.quantityInStock"
                                                    type="text"
                                                    placeholder="Quantity in stock"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                                <div
                                                    class="border-0 whitespace-normal py-0 pr-4 text-sm font-semibold">
                                                    <BackendErrors
                                                        :errorField="`quantity_in_stock${value.id}`">
                                                    </BackendErrors>
                                                </div>
                                            </div>

                                            <div v-if="getAutoStock === false"
                                                 class="self-center justify-self-center h-full mr-12">
                                                <div class="flex justify-left items-center gap-6 mt-2.5">
                                                    <SwitchGroup as="div" class="flex items-center">
                                                        <Switch
                                                            v-model="value.quantityInStock"
                                                            :class="[value.quantityInStock ? 'bg-emerald-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-68 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500']">
                                                            <span class="sr-only">Use setting</span>
                                                            <span
                                                                :class="[value.quantityInStock ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
      <span
          :class="[value.quantityInStock ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[value.quantityInStock ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
                                                        </Switch>
                                                        <SwitchLabel as="span" class="ml-3">
                                                        <span
                                                            class="text-sm font-medium text-gray-900">In stock? </span>
                                                        </SwitchLabel>
                                                    </SwitchGroup>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-gray-800 align-top">
                                            <input
                                                v-model="value.productBarcode"
                                                type="text"
                                                placeholder="Barcode (optional)"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <div
                                                class="border-0 whitespace-normal py-0 pr-4 text-sm font-semibold">
                                                <BackendErrors
                                                    :errorField="`product_barcode${value.id}`">
                                                </BackendErrors>
                                            </div>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-gray-800 align-top text-right">
                                            <button
                                                type="button"
                                                @click="editVariant(value.id, value.nameValue)"
                                                class="onlyIconButton focusWithBackground py-3">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="h-5 w-5"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                                </svg>
                                                <span class="sr-only">{{ value.nameValue }}</span>
                                            </button>
                                        </td>

                                        <td class="whitespace-nowrap px-3 py-4 text-gray-800 align-top">
                                            <button
                                                @click="deleteVariant(value.id, value.nameValue)"
                                                class="onlyIconButton errorFocusWithErrorBackground py-3"
                                                type="button">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke-width="2"
                                                     stroke="currentColor"
                                                     class="w-5 h-5 cursor-pointer">
                                                    <path stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                </svg>
                                            </button>

                                        </td>
                                    </tr>
                                </TransitionGroup>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>

    <DynamicModal
        :type="typeModal"
        :id="idModal"
        :gridColumnAmount="gridColumnModal"
        :title="titleModal"
        :description="descriptionModal"
        :firstButtonText="firstButtonModal"
        :secondButtonText="secondButtonModal"
        :thirdButtonText="thirdButtonModal"
        :open="openModal"
        @firstModalButtonFunction="firstModalButtonFunction"
        @secondModalButtonFunction="secondModalButtonFunction"
        @thirdModalButtonFunction="thirdModalButtonFunction">

        <div v-if="namedSlotBulkEdit">
            <div v-if="false">
                <header>
                    <p class="mt-4 mb-12 text-center mt-2 text-sm text-gray-500 border-b border-gray-200">
                    </p>
                </header>
            </div>
            <main>
                <div>
                    <div>
                        <div class="section-form-containerModal">
                            <div class="section-form-boxModal">
                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">
                                            Price & Inventory
                                        </h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci
                                                        consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam
                                                        veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="grid md:grid-cols-2 justify-left item-baseline md:gap-4">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_price"
                                                   class="primaryLabel">
                                                Price
                                            </label>
                                            <input
                                                v-model="bulkEditValues.productPrice"
                                                type="number"
                                                id="product_price"
                                                placeholder="00.00"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>

                                        <div class="labelInputErrorDiv">
                                            <label for="product_sku"
                                                   class="primaryLabel">
                                                SKU (optional)
                                            </label>
                                            <input
                                                v-model="bulkEditValues.productSku"
                                                type="text"
                                                id="product_sku"
                                                placeholder="SKU (optional)"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                    </div>
                                    <div class="grid md:grid-cols-2 justify-left item-baseline md:gap-4">
                                        <div class="labelInputErrorDiv">
                                            <label for="quantity_in_stock"
                                                   class="primaryLabel">
                                                Quantity in stock
                                            </label>
                                            <div v-if="getAutoStock === true">
                                                <input
                                                    v-model="bulkEditValues.quantityInStock"
                                                    type="text"
                                                    id="quantity_in_stock"
                                                    placeholder="Quantity in stock"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                            <div v-if="getAutoStock === false"
                                                 class="self-center justify-self-center h-full mr-12">
                                                <div class="flex justify-left items-center gap-6 mt-2.5">
                                                    <SwitchGroup as="div" class="flex items-center">
                                                        <Switch
                                                            v-model="bulkEditValues.quantityInStock"
                                                            :class="[bulkEditValues.quantityInStock ? 'bg-emerald-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-68 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500']">
                                                            <span class="sr-only">Use setting</span>
                                                            <span
                                                                :class="[bulkEditValues.quantityInStock ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
      <span
          :class="[bulkEditValues.quantityInStock ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[bulkEditValues.quantityInStock ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
                                                        </Switch>
                                                        <SwitchLabel as="span" class="ml-3">
                                                        <span
                                                            class="text-sm font-medium text-gray-900">In stock? </span>
                                                        </SwitchLabel>
                                                    </SwitchGroup>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="labelInputErrorDiv">
                                            <label for="product_barcode"
                                                   class="primaryLabel">
                                                Barcode (optional)
                                            </label>
                                            <input
                                                v-model="bulkEditValues.productBarcode"
                                                type="text"
                                                id="product_barcode"
                                                placeholder="Barcode (optional)"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">Customs details</h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci
                                                        consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam
                                                        veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_material"
                                                       class="primaryLabel">
                                                    Material (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.material"
                                                    type="text"
                                                    id="product_material"
                                                    placeholder="Material (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_mid_code"
                                                       class="primaryLabel">
                                                    Mid Code (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.midCode"
                                                    type="text"
                                                    id="product_mid_code"
                                                    placeholder="Mid Code (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_hs_code"
                                                       class="primaryLabel">
                                                    HS Code (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.hsCode"
                                                    type="text"
                                                    id="product_hs_code"
                                                    placeholder="HS Code (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="my-select"
                                                       class="primaryLabel">
                                                    Country Of origin (optional)
                                                </label>
                                                <v-select
                                                    v-model="bulkEditValues.countryOfOrigin"
                                                    id="my-select"
                                                    class="primaryInput"
                                                    :options="COUNTRY_LIST">
                                                </v-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">Dimensions</h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci
                                                        consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam
                                                        totam
                                                        veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_weight"
                                                       class="primaryLabel">
                                                    Weight (in grams) (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.productsWeight"
                                                    type="text"
                                                    id="product_weight"
                                                    placeholder="Weight (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                                <BackendErrors errorField="product_weight"></BackendErrors>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_length"
                                                       class="primaryLabel">Length (in millimeters) (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.length"
                                                    type="text"
                                                    id="product_length"
                                                    placeholder="Length (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_height"
                                                       class="primaryLabel">Height (in millimeters) (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.height"
                                                    type="text"
                                                    id="product_height"
                                                    placeholder="Height (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_width"
                                                       class="primaryLabel">Width (in millimeters) (optional)
                                                </label>
                                                <input
                                                    v-model="bulkEditValues.width"
                                                    type="text"
                                                    id="product_width"
                                                    placeholder="Width (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <div v-if="namedSlotEditVariant">
            <div v-if="false">
                <header>
                    <p class="mt-4 mb-12 text-center mt-2 text-sm text-gray-500 border-b border-gray-200">
                    </p>
                </header>
            </div>
            <main>
                <div>
                    <div>
                        <div class="section-form-containerModal">
                            <div class="section-form-boxModal">

                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">
                                            Price & Inventory
                                        </h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci
                                                        consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam
                                                        veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="grid md:grid-cols-2 justify-left item-baseline md:gap-4">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_price"
                                                   class="primaryLabel">
                                                Price
                                            </label>
                                            <input
                                                v-model="editVariantValues.productPrice"
                                                type="number"
                                                id="product_price"
                                                placeholder="00.00"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                        <div class="labelInputErrorDiv">
                                            <label for="product_sku"
                                                   class="primaryLabel">
                                                SKU (optional)
                                            </label>
                                            <input
                                                v-model="editVariantValues.productSku"
                                                type="text"
                                                id="product_sku"
                                                placeholder="SKU (optional)"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                    </div>
                                    <div class="grid md:grid-cols-2 justify-left item-baseline md:gap-4">
                                        <div class="labelInputErrorDiv">
                                            <label for="quantity_in_stock"
                                                   class="primaryLabel">
                                                Quantity in stock
                                            </label>
                                            <div v-if="getAutoStock === true">
                                                <input
                                                    v-model="editVariantValues.quantityInStock"
                                                    type="text"
                                                    id="quantity_in_stock"
                                                    placeholder="Quantity in stock"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                            <div v-if="getAutoStock === false"
                                                 class="self-center justify-self-center h-full mr-12">
                                                <div class="flex justify-left items-center gap-6 mt-2.5">
                                                    <SwitchGroup as="div" class="flex items-center">
                                                        <Switch
                                                            v-model="editVariantValues.quantityInStock"
                                                            :class="[editVariantValues.quantityInStock ? 'bg-emerald-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-68 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500']">
                                                            <span class="sr-only">Use setting</span>
                                                            <span
                                                                :class="[editVariantValues.quantityInStock ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
      <span
          :class="[editVariantValues.quantityInStock ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[editVariantValues.quantityInStock ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
                                                        </Switch>
                                                        <SwitchLabel as="span" class="ml-3">
                                                        <span
                                                            class="text-sm font-medium text-gray-900">In stock? </span>
                                                        </SwitchLabel>
                                                    </SwitchGroup>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="labelInputErrorDiv">
                                            <label for="product_barcode"
                                                   class="primaryLabel">
                                                Barcode (optional)
                                            </label>
                                            <input
                                                v-model="editVariantValues.productBarcode"
                                                type="text"
                                                id="product_barcode"
                                                placeholder="Barcode (optional)"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">Customs details</h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci
                                                        consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam
                                                        veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_material"
                                                       class="primaryLabel">
                                                    Material (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.material"
                                                    type="text"
                                                    id="product_material"
                                                    placeholder="Material (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_mid_code"
                                                       class="primaryLabel">Mid Code (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.midCode"
                                                    type="text"
                                                    id="product_mid_code"
                                                    placeholder="Mid Code (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_hs_code"
                                                       class="primaryLabel">HS Code (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.hsCode"
                                                    type="text"
                                                    id="product_hs_code"
                                                    placeholder="HS Code (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="my-select"
                                                       class="primaryLabel">
                                                    Country Of origin (optional)
                                                </label>
                                                <v-select
                                                    id="my-select"
                                                    class="primaryInput"
                                                    v-model="editVariantValues.countryOfOrigin"
                                                    :options="COUNTRY_LIST">
                                                </v-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">Dimensions</h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci
                                                        consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam
                                                        veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_weight"
                                                       class="primaryLabel">Weight (in grams) (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.productsWeight"
                                                    type="text"
                                                    id="product_weight"
                                                    placeholder="Weight (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                                <BackendErrors errorField="product_weight"></BackendErrors>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_length"
                                                       class="primaryLabel">Length (in millimeters) (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.length"
                                                    type="text"
                                                    id="product_length"
                                                    placeholder="Length (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-start primary-gap">
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_height"
                                                       class="primaryLabel">Height (in millimeters) (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.height"
                                                    type="text"
                                                    id="product_height"
                                                    placeholder="Height (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <div class="labelInputErrorDiv">
                                                <label for="product_width"
                                                       class="primaryLabel">Width (in millimeters) (optional)
                                                </label>
                                                <input
                                                    v-model="editVariantValues.width"
                                                    type="text"
                                                    id="product_width"
                                                    placeholder="Width (optional)"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </DynamicModal>
</template>


<script setup>
// store
import {useStore} from "vuex";
import {computed, ref, onMounted} from "vue";
import BackendErrors from "../../errors/BackendErrors";
import Drag from "../../icons/Drag";
import uniqid from 'uniqid';
import DynamicModal from "../../modal/DynamicModal";
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import {watch} from "vue";
import {PlusSmIcon as PlusSmIconOutline} from '@heroicons/vue/outline'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {COUNTRY_LIST} from '../../../../../config/countries.js'
import Popper from "vue3-popper";
import Draggable from 'vuedraggable';


// store
const store = useStore();

// get auto stock
const getAutoStock = computed(() => {
    return store.getters['createProduct/getAutoStock']
});

// use dynamic model
const openModal = ref(false);
// modal content
const typeModal = ref('');
const idModal = ref(Number(null));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);

//
//
//
// test test test drag - start
const dragging = ref(true);


const checkMove = function (test1, test2) {
    console.log('test1 is:', test1)
    console.log('test2 is:', test1)
    // logic for total number of values - start
    // logic for total number of values - start
    // logic for total number of values - start
    // logic for total number of values - start
    //
    // table&values
    const mapValues = optionsWithValuesForConversion.value
        .map(values => {
            return values.values
        })

    const mapNameValue = mapValues
        .map((elem) => {
            return elem.map(({nameValue}) => {
                return nameValue
            });
        })
    //
    //
    //
    //
    const reduceNameValue = mapNameValue.reduce((acc, cur) => {
        return acc.flatMap((seq) => {
            return cur.map((part) => {
                return `${seq}/${part}`
            });
        });
    })

    // all combinations
    allCombinations.value = reduceNameValue.map((variantName) => {
        return ({
            nameValue: variantName,
            id: uniqid(),
            valueIndex: null,
            // is added in form
            productPrice: null,
            productSku: null,
            quantityInStock: null,
            productBarcode: null,
            // is added in modal
            productWeight: null,
            material: null,
            height: null,
            width: null,
            length: null,
            midCode: null,
            hsCode: null,
            countryOfOrigin: null,
        })
    });


    // push if nameValue not already existing
    allVariants.value.push(
        ...allCombinations.value.filter(({nameValue}) => {
            return allVariants.value.every((existing) => {
                // push if nameValue not already existing
                return existing.nameValue !== nameValue
            });
            // end filter
        })
        // end push
    );
    //
    //
    // delete values which do not match any values in allCombinations
    allVariants.value = allVariants.value.filter(value => {
        return allCombinations.value.some(comb => {
            return comb.nameValue === value.nameValue
        })
    })
    //
    // logic for total number of values - end
    // logic for total number of values - end
    // logic for total number of values - end
    // logic for total number of values - end
}

const enabled = ref(true);
// test test test drog - end
//
//
//
//
//
// set named slots for bulk edit
const namedSlotBulkEdit = ref(null)
// set named slots for bulk edit
const namedSlotEditVariant = ref(null)

// get user for unique campaign id
const getUser = computed(() => {
    return store.getters['user/getUser']
});
// old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});

// get variant type
const getVariantType = computed(() => {
    return store.getters['createProduct/getVariantType']
});

// frontend options with values error
const OptionsWithValuesFrontendError = ref(null);

// frontend option error
const frontendOptionError = ref({
    index: null,
    error: null,
});
// frontend value error
const frontendValueError = ref({
    index: null,
    error: null,
});

// dynamic options and values fields
const dynamicOptionsWithValuesFields = ref([]);

// option & values for submit
const optionsWithValuesForConversion = ref([]);

// all combinations
const allCombinations = ref([]);

// total number of values for the multiple product
const allVariants = ref([]);


// ref for option input field
const refOptionInput = ref(null);

// bulk edit values
const bulkEditValues = ref({});

// edit variant values
const editVariantValues = ref({});

// add dynamically options and values input fields
const addAnNewOption = function () {
    // set frontend error to null
    OptionsWithValuesFrontendError.value = null;

    const details = {
        option: null,
        optionId: uniqid(),
        index: null,
        value: "",
    }
    dynamicOptionsWithValuesFields.value.push(details);

// add first option and empty array for values
    optionsWithValuesForConversion.value.push({
        option: details.option,
        optionId: details.optionId,
        index: null,
        values: [],
    });
}

// all add value tags
const allAddedValueTags = ref(null);
//
// handle add option input
const handleAddOption = function (event, currentOption, optionId, index) {
    // set frontend error to null
    OptionsWithValuesFrontendError.value = null;

    // error if adding an empty input field
    if (currentOption === '' || currentOption === null) {
        frontendOptionError.value.index = index;
        frontendOptionError.value.error = "Field can not be empty.";
        return;
    }

    // spaces are not allowed
    if (currentOption !== null && currentOption.includes(' ')) {
        // set frontend error & set frontend error index
        frontendOptionError.value.index = index;
        frontendOptionError.value.error = "Option can not include spaces.";

        // return function
        return;
    }

    // check if option already exist
    const optionExist = optionsWithValuesForConversion.value.some(option => {
        if (option.option === currentOption) {
            return true;
        }
    });

    if (optionExist) {
        // set frontend error & set frontend error index
        frontendOptionError.value.index = index;
        frontendOptionError.value.error = "Option have already been addded.";


        // hør
        // empty input field after added option
        dynamicOptionsWithValuesFields.value[index].option = "";

        // return function
        return
    }

    // only allowed to add one option for each variant
    optionsWithValuesForConversion.value.some(optionValues => {

        // check if option is null. return error if founded option is null
        if (optionValues.optionId === optionId && optionValues.option !== null) {
            // set frontend error & set frontend error index
            frontendOptionError.value.index = index;
            frontendOptionError.value.error = "Only one option is allowed.";

            // empty input field after added option
            dynamicOptionsWithValuesFields.value[index].option = "";
            return true;
        }

        // add option
        // add the entered option, if no option have been added
        if (optionValues.optionId === optionId && optionValues.option === null) {
            optionValues.option = currentOption
            optionValues.index = index

            // empty input field after added option
            dynamicOptionsWithValuesFields.value[index].option = "";
            // blue focus
            refOptionInput.value[0].blur();
        }
    });
};
//

//
// handle add value input
const handleAddValue = function (currentValue, optionId, index) {
    // set frontend error to null
    OptionsWithValuesFrontendError.value = null;

    // error if adding an empty value string
    if (currentValue === '' || currentValue === null) {
        // set frontend error & set frontend error index
        frontendValueError.value.index = index;
        frontendValueError.value.error = "Field can not be empty.";

        // return function
        return;
    }

    // spaces are not allowed
    if (currentValue.includes(' ')) {
        // set frontend error & set frontend error index
        frontendValueError.value.index = index;
        frontendValueError.value.error = "Value can not include spaces.";

        // return function
        return;
    }

    //
    //
    //
    //
    //
    //
    //
    //
    // set a unique value id
    const valueId = uniqid()
    //
    //
    // set value and value details
    const temporaryValue = {
        nameValue: currentValue,
        valueId: valueId,
        optionId: optionId,
    };
    //
    //
    // TODO: logic is missing for: check if current value already exist (all value tags for option with id)
    //
    //
    // find option & values with frontend option id and push value into values
    optionsWithValuesForConversion.value = optionsWithValuesForConversion.value.map(option => {
        // push value into "options with values for conversion" in the chosen option
        if (option.optionId === optionId) {
            option.values.push(temporaryValue);
        }

        // return option
        return option
    });
    //
    //
    // logic for total number of values - start
    // logic for total number of values - start
    // logic for total number of values - start
    // logic for total number of values - start
    //
    // table&values
    const mapValues = optionsWithValuesForConversion.value
        .map(values => {
            return values.values
        })

    const mapNameValue = mapValues
        .map((elem) => {
            return elem.map(({nameValue}) => {
                return nameValue
            });
        })
    //
    //
    //
    //
    const reduceNameValue = mapNameValue.reduce((acc, cur) => {
        return acc.flatMap((seq) => {
            return cur.map((part) => {
                return `${seq}/${part}`
            });
        });
    })

    // all combinations
    allCombinations.value = reduceNameValue.map((variantName) => {
        return ({
            nameValue: variantName,
            id: uniqid(),
            valueIndex: null,
            // is added in form
            productPrice: null,
            productSku: null,
            quantityInStock: null,
            productBarcode: null,
            // is added in modal
            productWeight: null,
            material: null,
            height: null,
            width: null,
            length: null,
            midCode: null,
            hsCode: null,
            countryOfOrigin: null,
        })
    });


    // push if nameValue not already existing
    allVariants.value.push(
        ...allCombinations.value.filter(({nameValue}) => {
            return allVariants.value.every((existing) => {
                // push if nameValue not already existing
                return existing.nameValue !== nameValue
            });
            // end filter
        })
        // end push
    );
    //
    //
    // delete values which do not match any values in allCombinations
    allVariants.value = allVariants.value.filter(value => {
        return allCombinations.value.some(comb => {
            return comb.nameValue === value.nameValue
        })
    })
    //
    // logic for total number of values - end
    // logic for total number of values - end
    // logic for total number of values - end
    // logic for total number of values - end
    //
    //
    //
    //
    //
    // clear frontend value error
    frontendValueError.value.index = null;
    frontendValueError.value.error = null;

    // empty input field after added value
    dynamicOptionsWithValuesFields.value[index].value = "";
};
//
//
// delete options input
const deleteEnteredOptionWithValues = function (optionId) {
    // set frontend error to null
    OptionsWithValuesFrontendError.value = null;

    // open modal to true
    openModal.value = true

    // set modal standards
    typeModal.value = 'delete';
    gridColumnModal.value = 2;
    titleModal.value = `Delete added option with it's variants`;
    descriptionModal.value = 'Are you sure you want to delete the added option with variants? The added option and variants cannot be restored.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Delete';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // close modal
        openModal.value = false
    };
    //
    // handle delete
    thirdModalButtonFunction.value = function () {


        // iterate over "options with values for submit" and find the clicked option
        optionsWithValuesForConversion.value = optionsWithValuesForConversion.value.filter((option) => {
            // delete found option from "options with values for submit"
            if (dynamicOptionsWithValuesFields.value.length > 1 && option.optionId === optionId) {
                return option.optionId !== optionId
            }
            // return the values which do not match the value id which was clicked
            return option
        })

        // also delete from "dynamic options with values"
        // iterate over "dynamic options with values" and find the clicked option
        dynamicOptionsWithValuesFields.value = dynamicOptionsWithValuesFields.value.filter((option) => {
            // delete found option from "dynamic options with values"
            if (dynamicOptionsWithValuesFields.value.length > 1 && option.optionId === optionId) {
                return option.optionId !== optionId
            }
            // frontend error if user want to delete last remaining option
            if (dynamicOptionsWithValuesFields.value.length === 1 && option.optionId === optionId) {
                OptionsWithValuesFrontendError.value = "Last remaining option cannot be deleted."
            }
            // return the values which do not match the value id which was clicked
            return option
        })

        //
        //
        //TODO: delete option and values inputs from all values for product
        // logic for total number of values - start
        // logic for total number of values - start
        // logic for total number of values - start
        // logic for total number of values - start
        //
        // table&values
        const mapValues = optionsWithValuesForConversion.value
            .map(values => {
                return values.values
            })

        const mapNameValue = mapValues
            .map((elem) => {
                return elem.map(({nameValue}) => {
                    return nameValue
                });
            })
        //
        //
        //
        //
        const reduceNameValue = mapNameValue.reduce((acc, cur) => {
            return acc.flatMap((seq) => {
                return cur.map((part) => {
                    return `${seq}/${part}`
                });
            });
        })

        // all combinations
        allCombinations.value = reduceNameValue.map((variantName) => {
            return ({
                nameValue: variantName,
                id: uniqid(),
                valueIndex: null,
                // is added in form
                productPrice: null,
                productSku: null,
                quantityInStock: null,
                productBarcode: null,
                // is added in modal
                productWeight: null,
                material: null,
                height: null,
                width: null,
                length: null,
                midCode: null,
                hsCode: null,
                countryOfOrigin: null,
            })
        });


        // push if nameValue not already existing
        allVariants.value.push(
            ...allCombinations.value.filter(({nameValue}) => {
                return allVariants.value.every((existing) => {
                    // push if nameValue not already existing
                    return existing.nameValue !== nameValue
                });
                // end filter
            })
            // end push
        );
        //
        //
        // delete values which do not match any values in allCombinations
        allVariants.value = allVariants.value.filter(value => {
            return allCombinations.value.some(comb => {
                return comb.nameValue === value.nameValue
            })
        })
        //
        // logic for total number of values - end
        // logic for total number of values - end
        // logic for total number of values - end
        // logic for total number of values - end
        //
        //


        // close modal
        openModal.value = false
    };
// end modal//
};

//
// delete options input
const deleteEnteredOption = function (optionId) {
    // set frontend error to null
    OptionsWithValuesFrontendError.value = null;

    // iterate over "options with values for submit" and find the clicked option
    optionsWithValuesForConversion.value = optionsWithValuesForConversion.value.filter((option) => {
        // delete found option from "options with values for submit"
        if (option.optionId === optionId) {
            option.option = null
        }
        // return the values which do not match the value id which was clicked
        return option
    })
};

// delete value input
const deleteEnteredValue = function (optionId, valueId) {
    // set frontend error to null
    OptionsWithValuesFrontendError.value = null;

    // iterate over "options with values for submit" and find the clicked value
    optionsWithValuesForConversion.value = optionsWithValuesForConversion.value.filter((option) => {

        // when click on a value, find the option and iterate over values belonging to the option
        if (option.optionId === optionId) {

            // delete found value from "options with values for submit"
            option.values = option.values.filter((value) => {
                if (value.valueId === valueId) {
                    return value.valueId !== valueId
                }
                // return the values which do not match the value id which was clicked
                return value
            })
        }

        return option
    })

    //TODO: delete deleted input value from all values for product
    // also delete value from "all values for product"
    // test
    // test
    // logic for total number of values - start
    // logic for total number of values - start
    // logic for total number of values - start
    // logic for total number of values - start
    //
    // table&values
    const mapValues = optionsWithValuesForConversion.value
        .map(values => {
            return values.values
        })

    const mapNameValue = mapValues
        .map((elem) => {
            return elem.map(({nameValue}) => {
                return nameValue
            });
        })
    //
    //
    //
    //
    const reduceNameValue = mapNameValue.reduce((acc, cur) => {
        return acc.flatMap((seq) => {
            return cur.map((part) => {
                return `${seq}/${part}`
            });
        });
    })

    // all combinations
    allCombinations.value = reduceNameValue.map((variantName) => {
        return ({
            nameValue: variantName,
            id: uniqid(),
            valueIndex: null,
            // is added in form
            productPrice: null,
            productSku: null,
            quantityInStock: null,
            productBarcode: null,
            // is added in modal
            productWeight: null,
            material: null,
            height: null,
            width: null,
            length: null,
            midCode: null,
            hsCode: null,
            countryOfOrigin: null,
        })
    });


    // push if nameValue not already existing
    allVariants.value.push(
        ...allCombinations.value.filter(({nameValue}) => {
            return allVariants.value.every((existing) => {
                // push if nameValue not already existing
                return existing.nameValue !== nameValue
            });
            // end filter
        })
        // end push
    );
    //
    //
    // delete values which do not match any values in allCombinations
    allVariants.value = allVariants.value.filter(value => {
        return allCombinations.value.some(comb => {
            return comb.nameValue === value.nameValue
        })
    })
    //
    // logic for total number of values - end
    // logic for total number of values - end
    // logic for total number of values - end
    // logic for total number of values - end
    // test
    // test
};

const editVariant = function (id, variantName) {
    // iterate over all values for product
    allVariants.value.forEach((value) => {
        // set fields in modal equal to values for product which match with clicked id
        if (id === value.id) {
            editVariantValues.value.productPrice = value.productPrice
            editVariantValues.value.productSku = value.productSku
            editVariantValues.value.quantityInStock = value.quantityInStock
            editVariantValues.value.productBarcode = value.productBarcode

            editVariantValues.value.material = value.material
            editVariantValues.value.midCode = value.midCode
            editVariantValues.value.hsCode = value.hsCode
            editVariantValues.value.countryOfOrigin = value.countryOfOrigin

            editVariantValues.value.productsWeight = value.productsWeight
            editVariantValues.value.length = value.length
            editVariantValues.value.height = value.height
            editVariantValues.value.width = value.width
        }
    })


    // open modal to true
    openModal.value = true

    // named slot for edit variant
    namedSlotEditVariant.value = true

    // set modal standards
    typeModal.value = 'default';
    gridColumnModal.value = 2;
    titleModal.value = `Edit variant ${variantName}`;
    descriptionModal.value = 'Change unique product variant.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Update';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // named slot for edit variant
        namedSlotEditVariant.value = false

        // close modal
        openModal.value = false
    };
    //
    // handle add campaign
    thirdModalButtonFunction.value = function () {
        // iterate over all values for product
        allVariants.value.forEach((value) => {
            // update founded value with new added values
            if (id === value.id) {
                value.productPrice = editVariantValues.value.productPrice
                value.productSku = editVariantValues.value.productSku
                value.quantityInStock = editVariantValues.value.quantityInStock
                value.productBarcode = editVariantValues.value.productBarcode

                value.material = editVariantValues.value.material
                value.midCode = editVariantValues.value.midCode
                value.hsCode = editVariantValues.value.hsCode
                value.countryOfOrigin = editVariantValues.value.countryOfOrigin

                value.productsWeight = editVariantValues.value.productsWeight
                value.length = editVariantValues.value.length
                value.height = editVariantValues.value.height
                value.width = editVariantValues.value.width
            }
        })

        // named slot for edit variant
        namedSlotEditVariant.value = false
        // close modal
        openModal.value = false
    };
// end modal
}

const deleteVariant = function (id, variantName) {
    // open modal to true
    openModal.value = true

    // set modal standards
    typeModal.value = 'delete';
    gridColumnModal.value = 2;
    titleModal.value = `Are you sure you want to delete variant ${variantName}?`;
    descriptionModal.value = 'Are you sure you want to delete this product variant? The variant cannot be restored.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Delete';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // close modal
        openModal.value = false
    };
    //
    // handle add campaign
    thirdModalButtonFunction.value = function () {
        allVariants.value = allVariants.value.filter(value => {
            return value.id !== id
        });
        // close modal
        openModal.value = false
    };
// end modal

}


const bulkEdit = function () {
    // named slot for bulk edit
    namedSlotBulkEdit.value = true
    // open modal to true
    openModal.value = true

    // set modal standards
    typeModal.value = 'default';
    gridColumnModal.value = 2;
    titleModal.value = 'Bulk edit variants';
    descriptionModal.value = 'Bulk edit multiple selected variants.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Save';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // named slot for bulk edit
        namedSlotBulkEdit.value = false
        // close modal
        openModal.value = false
    };
    //
    // handle add campaign
    thirdModalButtonFunction.value = function () {


        // test test test test test
        selectedValues.value.forEach((valueName) => {
            allVariants.value = allVariants.value.filter(value => {
                if (valueName === value.nameValue) {
                    value.productPrice = bulkEditValues.value.productPrice
                    value.productSku = bulkEditValues.value.productSku
                    value.quantityInStock = bulkEditValues.value.quantityInStock
                    value.productBarcode = bulkEditValues.value.productBarcode

                    value.material = bulkEditValues.value.material
                    value.midCode = bulkEditValues.value.midCode
                    value.hsCode = bulkEditValues.value.hsCode
                    value.countryOfOrigin = bulkEditValues.value.countryOfOrigin

                    value.productsWeight = bulkEditValues.value.productsWeight
                    value.length = bulkEditValues.value.length
                    value.height = bulkEditValues.value.height
                    value.width = bulkEditValues.value.width
                }

                return value
            })
        })


        // named slot for bulk edit
        namedSlotBulkEdit.value = false
        // close modal
        openModal.value = false
    };
}


const bulkDelete = function () {
    // open modal to true
    openModal.value = true

    // set modal standards
    typeModal.value = 'default';
    gridColumnModal.value = 2;
    titleModal.value = 'Are you sure you want to delete selected variants';
    descriptionModal.value = 'Are you sure you want to delete selected variants? The deleted variants cannot be restored.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Delete';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // close modal
        openModal.value = false
    };
    //
    // handle bulk delete
    thirdModalButtonFunction.value = function () {
        // bulk delete
        // handle bulk delete
        allVariants.value = allVariants.value.filter(value => {
            return selectedValues.value.some(val => {
                return val !== value.nameValue
            })
        })

        // close modal
        openModal.value = false
    };
}
// tables - start
// tables - start
// tables - start
// tables - start
// tables - start

// selected values
const selectedValues = ref([])
// checked values
const checked = ref(false)
// indeterminate
const indeterminate = computed(() => {
    return selectedValues.value.length > 0 && selectedValues.value.length < allVariants.value.length
});

// tables - end
// tables - end
// tables - end
// tables - end
// tables - end

// draggable logic - start
const valueListener = function () {
    console.log('draggable listener fn ran')
}
// draggable logic - end


// set campaigns
store.commit('createProduct/setOptionsWithValues', optionsWithValuesForConversion);

// set old value


// set old value
onMounted(() => {
    // check if old values exist for values and option
    if (oldValues.value.options_values) {
        // iterate over old values and option and set equal to option and values for submit
        oldValues.value.options_values.forEach(optionWithValues => {
            optionsWithValuesForConversion.value.push(
                {
                    option: optionWithValues.option,
                    optionId: optionWithValues.frontend_id,
                    index: Number(optionWithValues.option_index),
                    values: (function () {
                        if (optionWithValues.values) {
                            return optionWithValues.values.map(value => {
                                return {
                                    nameValue: value.name_value,
                                    valueId: value.value_id,
                                    optionId: value.frontend_option_id,
                                    valueIndex: value.value_index,
                                    frontendOptionIndex: value.frontend_option_index,

                                }
                            })
                        }
                        if (!optionWithValues.values) {
                            return []
                        }
                    })(),
                }
            );
        })
        // single old option values
        oldValues.value.options_values.forEach(optionWithValues => {
            const details = {
                option: "",
                optionId: optionWithValues.frontend_id,
                value: "",
                index: null,
            }
            dynamicOptionsWithValuesFields.value.push(details);
        })
    }
//
//
//
    // check if old values exist for values and option
    if (oldValues.value.all_product_variants) {
        // iterate over old values and option and set equal to option and values for submit
        oldValues.value.all_product_variants.forEach(value => {
            allVariants.value.push(
                {
                    nameValue: value.name_value,
                    id: value.value_id,
                    // in form
                    productPrice: value.product_price,
                    productSku: value.product_sku,
                    quantityInStock: (function () {
                        // // old value & logic for quantity in stock based on if auto stock is false
                        if (oldValues.value.auto_stock === 'on') {
                            return value.quantity_in_stock;
                        }
                        if (oldValues.value.auto_stock !== 'on') {
                            if (value.quantity_in_stock === 'false') {
                                return false;
                            }
                            if (value.quantity_in_stock === 'null') {
                                return false;
                            }
                            if (value.quantity_in_stock === 'true') {
                                return true;
                            }
                        }
                    }()),
                    productBarcode: value.product_barcode,
                    // is added in modal
                    productWeight: value.product_weight,
                    material: value.product_material,
                    height: value.product_height,
                    width: value.product_width,
                    length: value.product_length,
                    midCode: value.product_mid_code,
                    hsCode: value.product_hs_code,
                    countryOfOrigin: value.country_of_origin,
                }
            );
        })
    }
//
//

//
//
//
    if (allVariants.value.length === 0 && dynamicOptionsWithValuesFields.value.length === 0 && getVariantType.value === 'multipleProduct') {
        const details = {
            option: null,
            optionId: uniqid(),
            index: null,
            value: "",
        }
        dynamicOptionsWithValuesFields.value.push(details);

// add first option and empty array for values
        optionsWithValuesForConversion.value.push({
            option: details.option,
            optionId: details.optionId,
            index: null,
            values: [],
        });
    }
//
//
//
})

</script>


<style scoped>
/* vue slected css - start*/
>>> {
    /* borders */
    --vs-border-color: #eeeeee;
    --vs-border-width: 0;
    --vs-border-style: solid;
    --vs-border-radius: 4px;

    /* controls */
    --vs-controls-color: #666;
    --vs-border-color: #eee;


    /* dropdown */
    --vs-dropdown-bg: #fff;
    --vs-dropdown-option-color: #000;

    /* selected */
    --vs-selected-color: #000;

    /* hover*/
    --vs-dropdown-option--active-bg: #10b981;
    --vs-dropdown-option--active-color: #fff;
}

/* vue slected css - end*/
</style>
