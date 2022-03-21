<template>
    <ul class="timeline d-flex justify-content-center list-unstyled mb-6">
            <li class="timeline-item active">
                <p class="timeline-pointer">1</p>
                訂單確認
            </li>
            <li class="timeline-item" :class="order?.id ? 'active' : ''">
                <p class="timeline-pointer">2</p>
                訂單建立
            </li>
            <li class="timeline-item" :class="order?.is_paid ? 'active' : ''">
                <p class="timeline-pointer">3</p>
                完成訂單
            </li>
        </ul>
</template>

<script>
export default {
  props: ['order']
}
</script>
