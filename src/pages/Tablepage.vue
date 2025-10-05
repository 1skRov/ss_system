<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox' // 1. Импортируем чекбокс
import { Trash2Icon } from 'lucide-vue-next'

const products = [
  { id: 1, name: 'Хлеб', quantity: 2, price: 150, discount: 0, total: 300 },
  { id: 2, name: 'Молоко', quantity: 1, price: 350, discount: 10, total: 340 },
  { id: 3, name: 'Сыр', quantity: 1, price: 1200, discount: 100, total: 1100 },
]
</script>

<template>
  <div class="p-4 border rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[50px]"></TableHead>
          <TableHead class="w-[300px]">Название</TableHead>
          <TableHead>Количество</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Скидка</TableHead>
          <TableHead>Итого</TableHead>
          <TableHead class="text-right w-[100px]">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in products" :key="product.id">
          <TableCell>
            <Checkbox :id="`product-${product.id}`" />
          </TableCell>
          <TableCell class="font-medium">{{ product.name }}</TableCell>
          <TableCell>{{ product.quantity }}</TableCell>
          <TableCell>{{ product.price }} ₸</TableCell>
          <TableCell>{{ product.discount }} ₸</TableCell>
          <TableCell>{{ product.total }} ₸</TableCell>
          <TableCell class="text-right">
            <Button variant="ghost" size="icon">
              <Trash2Icon class="w-4 h-4 text-red-500" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  <TableComponent />
</template>
<style scoped></style>
