import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class EmployeeEventsProducer implements OnModuleInit, OnApplicationShutdown {
   private readonly kafka = new Kafka({
    brokers: ['pkc-6ojv2.us-west4.gcp.confluent.cloud:9092'],
    sasl: {
        mechanism: 'plain',
        username: 'Y7ZE2ITIHPBJ5QBE',
        password: 'pDT6YthjNu25fGCQUzSuH1e7G8Vj1MgOmFBwry//krlzu1R20RtSz5BxXGd18kco'
    },
    ssl:true
   });
   private readonly producer: Producer = this.kafka.producer();

   async onModuleInit() {
       await this.producer.connect();
   }

   async produce(record: ProducerRecord){
    await this.producer.send(record);
   }
   async onApplicationShutdown() {
       await this.producer.disconnect();
   }
}
