<template>
    <div class="mb-16 pb-6 border-b-2 border-emerald-500">
        <slot name="breadcrumb">
        </slot>
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <header>
                    <div class="overview-action-header">
                        <slot name="header"></slot>
                    </div>
                    <p class="primaryParagraph">
                        <slot name="para">
                        </slot>
                    </p>
                </header>

            </div>

            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <main>
                    <slot name="content"></slot>
                </main>
            </div>
        </div>
    </div>
</template>

