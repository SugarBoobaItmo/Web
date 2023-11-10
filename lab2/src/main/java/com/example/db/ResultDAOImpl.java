package com.example.db;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import java.util.Collection;

import com.example.entity.PointsResultEntity;

public class ResultDAOImpl implements ResultDAO {
    private final EntityManager entityManager = JPAUtils.getFactory().createEntityManager();

    @Override
    public void addNewResult(PointsResultEntity result) {
        executeInTransaction(() -> entityManager.persist(result));
    }

    @Override
    public void updateResult(Long result_id, PointsResultEntity result) {
        executeInTransaction(() -> entityManager.merge(result));
    }

    @Override
    public PointsResultEntity getResultById(Long result_id) {
        return entityManager.getReference(PointsResultEntity.class, result_id);
    }

    @Override
    public Collection<PointsResultEntity> getAllResults() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<PointsResultEntity> criteriaQuery = criteriaBuilder.createQuery(PointsResultEntity.class);
        Root<PointsResultEntity> root = criteriaQuery.from(PointsResultEntity.class);
        return entityManager.createQuery( criteriaQuery.select(root)).getResultList();
    }

    @Override
    public void deleteResult(PointsResultEntity result) {
        executeInTransaction(() -> entityManager.remove(result));
    }

    @Override
    public void clearResults() {
        executeInTransaction(entityManager::clear);
    }

    private void executeInTransaction(Runnable action) {
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            action.run();
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            throw new RuntimeException("Transaction failed", e);
        }
    }
}
